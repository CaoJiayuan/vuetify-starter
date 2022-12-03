<template>
  <div class="m-map" :class="{ disabled }">
    <div class="search" v-if="placeSearch">
      <input type="text" placeholder="请输入关键字" v-model="searchKey" />
      <button type="button" @click="handleSearch">搜索</button>
      <div id="js-result" v-show="searchKey" class="result"></div>
    </div>
    <div id="js-container" class="map">正在加载数据 ...</div>
    <div class="map-cover" v-if="(disabled || editValue)">
      <v-btn v-if="editValue" @click="(editValue = false)">重新选择位置</v-btn>
    </div>
  </div>
</template>

<script>
import remoteLoad from "./utils/remoteLoad.js";
import { MapKey, MapCityName } from "./config/config";
export default {
  props: {
    lat: {
      type: [Number, String],
    },
    lng: {
      type: [Number, String],
    },
    disabled: Boolean,
    editable: Boolean
  },
  data() {
    return {
      searchKey: "",
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      mapObject: null,
      editValue: false
    };
  },
  watch: {
    searchKey() {
      if (this.searchKey === "") {
        this.placeSearch.clear();
      }
    },
    editable(v) {
      this.editValue = v
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey);
      }
    },
    // 实例化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName,
        };
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat];
        }
        let map = new AMap.Map("js-container", mapConfig);
        this.mapObject = map;
        // 加载地图搜索插件
        AMap.service("AMap.PlaceSearch", () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: false,
            city: MapCityName,
            map: map,
            panel: "js-result",
          });
          let _this = this;
          this.placeSearch.on("complete", function (SearchResult) {
            let poi = SearchResult.poiList.pois[0];
            _this.dragStatus = false;
            if (poi) {
              let position = {
                address: poi.pname + poi.cityname + poi.adname + poi.address,
                lat: poi.location.lat,
                lng: poi.location.lng,
                city: poi.cityname,
                province: poi.pname,
                district: poi.adname,
                phone: poi.tel,
              };
              _this.$emit("drag", position);
            }
          });
          this.placeSearch.on("listElementClick", function (SelectChangeEvent) {
            let poi = SelectChangeEvent.data;
            _this.dragStatus = false;
            let position = {
              address: poi.pname + poi.cityname + poi.adname + poi.address,
              lat: poi.location.lat,
              lng: poi.location.lng,
              city: poi.cityname,
              province: poi.pname,
              district: poi.adname,
              phone: poi.tel,
            };
            _this.$emit("drag", position);
          });
        });
        // 启用工具条
        AMap.plugin(["AMap.ToolBar"], function () {
          map.addControl(
            new AMap.ToolBar({
              position: "RB",
            })
          );
        });
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map, // 依赖地图对象
        });
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", (positionResult) => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            let position = {
              address: positionResult.address,
              lat: positionResult.position.lat,
              lng: positionResult.position.lng,
              city: positionResult.regeocode.addressComponent.city,
              province: positionResult.regeocode.addressComponent.province,
              district: positionResult.regeocode.addressComponent.district,
              phone: "",
            };
            this.$emit("drag", position);
          }
        });
        // 启动拖放
        positionPicker.start();
      });
    },
    panTo(lat, lng) {
      this.mapObject && this.mapObject.panTo([lng, lat]);
    },
  },
  mounted() {
    this.editValue = this.editable
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.4.15&key=${MapKey}`);
      await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
      this.initMap();
    }
  },
};
</script>

<style lang="scss">
.m-map {
  min-width: 500px;
  min-height: 300px;
  position: relative;
  margin: 6px 0;
  .map-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.1);
    z-index: 2;
    backdrop-filter: blur(.5px);
    button {
      top: 25%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .map {
    width: 100%;
    height: 400px;
  }
  .amap-controls {
    z-index: 0;
    * {
      z-index: 0;
    }
  }
  &.disabled {
    .amap-controls {
      display: none;
    }
    .search {
      display: none;
    }
  }
  .amap-logo {
    z-index: 0;
  }
  .amap-copyright {
    z-index: 0;
  }

  .search {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 346px;
    z-index: 1;

    input {
      width: 276px;
      border: 1px solid #ccc;
      line-height: 20px;
      padding: 5px;
      outline: none;
      background-color: #fff;
    }

    button {
      line-height: 32px;
      background: #fff;
      border: 1px solid #ccc;
      width: 64px;
      height: 32px;
      text-align: center;
      margin-left: 6px;
    }
  }

  .result {
    max-height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>
