<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
// @ts-ignore
import data from '../data/people.csv';
import Papa from 'papaparse';

// 型定義
type PlayerInfo = {
    key_bbref: string;
    key_fangraphs: string;
    key_mlbam: string;
    key_person: string;
    key_retro: string;
    name_first: string;
    name_last: string;
    mlb_played_first: string;
    mlb_played_last: string;
};

// 検索情報
const people: { [index: string]: { [index: string]: string } } = {};

// 検索情報生成
fetch(data)
    .then((res) => res.text())
    .then((content) => Papa.parse<PlayerInfo>(content, { header: true }))
    .then((content) => {
        const ps = content.data;
        ps.forEach((p) => {
            const name = p.name_first + ' ' + p.name_last;
            people[name] = {
                key_bbref: p.key_bbref,
                key_fangraphs: p.key_fangraphs,
                key_retro: p.key_retro,
                key_mlbam: p.key_mlbam,
            };
        });
    });

// v-models or v-ons
const input = ref('');
const loading = ref(false);
const brUrl = ref('');
const fgUrl = ref('');
const savantUrl = ref('');
const mlbUrl = ref('');

// コールバックインターフェース
interface AutoCompleteCallback {
    (data: { [index: string]: string }[]): void;
}

const query = (queryString: string, cb: AutoCompleteCallback) => {
    const targets = queryString
        ? Object.keys(people).filter(
              (key) =>
                  key.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        : Object.keys(people);
    const result = targets.map((target) => {
        return { value: target };
    });
    cb(result);
};

// 検索ボタンハンドラ
const search = () => {
    // ロードを明示的に示したいため、setTimeoutでloading
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 1000);

    const name = input.value;
    if (!name) {
        return;
    }
    const info = people[name];
    const br = info['key_bbref'];
    const fg = info['key_fangraphs'];
    const mlb = info['key_mlbam'];
    const urlName = name.toLowerCase().replace(' ', '-');

    brUrl.value = br
        ? `https://www.baseball-reference.com/players/${br.slice(
              0,
              1
          )}/${br}.shtml`
        : '';
    fgUrl.value = fg
        ? `https://www.fangraphs.com/players/${urlName}/${fg}/stats`
        : '';
    savantUrl.value = mlb
        ? `https://baseballsavant.mlb.com/savant-player/${urlName}-${mlb}`
        : '';
    mlbUrl.value = mlb ? `https://www.mlb.com/player/${urlName}-${mlb}` : '';
};
</script>

<template>
  <div>
    <el-container v-loading="loading">
      <el-header>Bagle</el-header>
      <el-main>
        <el-row justify="center">
          <el-col :span="10">
            <el-autocomplete
              v-model="input"
              size="large"
              :fetch-suggestions="query"
              :trigger-on-focus="false"
              :prefix-icon="Search"
            />
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col
            class="button-area"
            :span="24"
          >
            <el-button
              type="info"
              plain
              @click="search"
            >
              検索
            </el-button>
          </el-col>
        </el-row>
      </el-main>
      <el-main>
        <el-row
          justify="center"
          :gutter="20"
        >
          <el-col :span="5">
            <LinkCard
              :href="brUrl"
              site-type="br"
            />
          </el-col>
          <el-col :span="5">
            <LinkCard
              :href="fgUrl"
              site-type="fg"
            />
          </el-col>
          <el-col :span="5">
            <LinkCard
              :href="savantUrl"
              site-type="savant"
            />
          </el-col>
          <el-col :span="5">
            <LinkCard
              :href="mlbUrl"
              site-type="mlb"
            />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
body {
    font-family: 'Martel Sans';
}

.el-header {
    font-family: 'Advent Pro';
    font-weight: 1000;
    font-size: 5em;
    text-align: center;
    --el-header-height: 1.4em !important;
}

.button-area {
    text-align: center;
}

.el-autocomplete {
    width: 100%;
}
</style>
