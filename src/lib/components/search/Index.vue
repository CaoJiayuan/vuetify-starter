<template>
  <v-dialog
    v-model="dialog"
    max-width="fit-content"
    max-height="fit-content"
    transition="slide-y-transition"
  >
    <v-card class="app-search">
      <div class="as-input-area">
        <v-icon>mdi-magnify</v-icon>
        <input
          @input="onInput"
          :placeholder="label"
          v-model="keyword"
          outlined
          name="kw"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @keyup.prevent.stop="walkResult"
          @keydown.prevent.stop.up.down="noneEv"
          @keyup.prevent.stop.enter="toFocus"
          ref="input"
        />
      </div>
      <div v-if="items.length > 0">
        <v-divider></v-divider>
        <v-list dense two-line class="as-list">
          <template v-for="(item, idx) in items">
            <div
              class="as-item"
              @click="clickItem(item)"
              :class="{ 'as-focus': idx == focus }"
              :key="`${item.key}-${idx}`"
              ref="items"
            >
              <v-list-item dense>
                <v-list-item-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.desc"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="as-hint">
                  <span>点击或按Enter键进入</span>
                </v-list-item-action>
              </v-list-item>
            </div>
          </template>
        </v-list>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { functions } from "nerio-js-utils";
const { standby } = functions;
import { waitingFor } from "../../utils/utils";
export default {
  props: {
    label: {
      type: String,
      default: () => "输入关键字搜索",
    },
    trigger: {
      type: Function,
      default: (e) => {
        return e.key == "F" && e.ctrlKey && e.shiftKey;
      },
    },
    data: {
      type: Array,
      default: () => [],
    },
    hotLimit: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {
      keyword: null,
      dialog: false,
      items: [],
      focus: -1,
    };
  },
  methods: {
    onSearchKey(e) {
      if (this.trigger(e)) {
        this.toggle()
      }
    },
    toggle() {
      this.dialog = !this.dialog;
      if (this.dialog) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.input.focus();
          });
        }, 100);
      }
    },
    search() {
      if (!this.keyword || this.keyword.length == 0) {
        this.items = [];
        return;
      }

      this.items = this.data.filter((item) => {
        let title = item.title || "";
        let desc = item.desc || "";
        let to = item.to || "";
        return (
          title.indexOf(this.keyword) > -1 ||
          desc.indexOf(this.keyword) > -1 ||
          to.indexOf(this.keyword) > -1
        );
      });
    },
    onInput() {
      this.focus = -1;
      standby(this.search, 200);
    },
    walkResult(e) {
      if (this.items.length < 1) {
        return;
      }
      if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        let diff;
        if (e.key == "ArrowUp") {
          diff = -1;
        } else {
          diff = 1;
        }
        if (this.focus < 1 && diff < 0) {
          this.focus = this.items.length - 1;
        } else if (this.focus > this.items.length - 1 && diff > 0) {
          this.focus = 0;
        } else {
          this.focus += diff;
        }
        let ref = this.$refs.items[this.focus];
        if (ref) {
          ref.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    clickItem(item) {
      if (item.action) {
        item.action(item, this.dismiss);
        return;
      }

      if (item.to) {
        if (this.$route.path != item.to) {
          this.$router.push(item.to);
        }
        this.dismiss();
        return;
      }
    },
    toFocus() {
      if (this.focus < 0) {
        return;
      }
      if (this.focus < this.items.length) {
        this.clickItem(this.items[this.focus]);
      }
    },
    noneEv(e) {},
    dismiss() {
      this.dialog = false;
    },
    getHotData(data) {
      this.items = data.slice(0, this.hotLimit);
    },
  },
  mounted() {
    document.addEventListener("keyup", this.onSearchKey);
    waitingFor(() => this.data).then(this.getHotData);
  },
  destroyed() {
    document.removeEventListener("keyup", this.onSearchKey);
  },
  watch: {
    data(now) {
      if (now.length > 0) {
        this.getHotData(now);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-search {
  width: 640px;
  .as-input-area {
    padding: 2px 4px;
    input {
      padding: 6px 12px;
      &:focus {
        outline: none;
      }
    }
  }
  .as-focus {
    background-color: rgb(226, 226, 226);
  }
  .as-item {
    cursor: pointer;
    &:hover {
      background-color: rgb(226, 226, 226);
      .as-hint {
        display: block;
      }
    }
    .as-hint {
      font-size: 12px;
      color: gray;
      display: none;
    }
    &.as-focus .as-hint {
      display: block;
    }
  }
  .as-list {
    max-height: 75vh;
    overflow-y: scroll;
  }
}
.v-dialog__content {
  align-items: flex-start;
}
</style>
