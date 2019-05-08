<template>
  <div>
     <!-- change-on-select -->
    <el-cascader :options="options" :props="props" clearable @change="change"
                 @active-item-change="activeItemChange"
                 style="width: 390px;">
    </el-cascader>
  </div>
</template>

<script>
export default {
  name: 'provCity',
  data() {
    return {
      level: 2,
      // 所有数据
      opt: [{
        value: '150000000000',
        label: '内蒙古自治区',
        children: [{
          value: '150100000000',
          label: '呼和浩特市',
          children: [{
            value: '150101000000',
            label: '市辖区'
          },{
            value: '150102000000',
            label: '新城区'
          }]
        },{
          value: '150200000000',
          label: '包头市',
          children: [{
            value: '150201000000',
            label: '市辖区'
          },{
            value: '150202000000',
            label: '东河区'
          }]
        }]
      },{
        value: '540000000000',
        label: '西藏自治区',
        children: [{
          value: '540100000000',
          label: '拉萨市',
          children: [{
            value: '540101000000',
            label: '市辖区'
          },{
            value: '540102000000',
            label: '城关区'
          }]
        },{
          value: '540200000000',
          label: '日喀则市',
          children: [{
            value: '540202000000',
            label: '桑珠孜区'
          },{
            value: '540221000000',
            label: '南木林县'
          }]
        }]
      }],
      // 选项
      optVal: [],
      // 选项
      options: [],
      // 所有城市
      citiesMap: new Map([
        // [parentOfProvinceCode, childrenOfCity]
        // 内蒙古自治区
        ['150000000000', [
          {value: '150100000000', label: '呼和浩特市'},
          {value: '150200000000', label: '包头市'}
        ]],
        // 西藏自治区
        ['540000000000', [
          {value: '540100000000', label: '拉萨市'},
          {value: '540200000000', label: '日喀则市'}
        ]]
      ]),
      // 所有区
      districtsMap: new Map([
        // [parentOfCityCode, childrenOfDistrict]
        // 内蒙古自治区 > 呼和浩特市
        ['150100000000', [
          {value: '150101000000', label: '市辖区'},
          {value: '150102000000', label: '新城区'}
        ]],
        // 内蒙古自治区 > 包头市
        ['150200000000', [
          {value: '150201000000', label: '市辖区'},
          {value: '150202000000', label: '东河区'}
        ]],
        // 西藏自治区 > 拉萨市
        ['540100000000', [
          {value: '540101000000', label: '市辖区'},
          {value: '540102000000', label: '城关区'}
        ]],
        // 西藏自治区 > 日喀则市
        ['540200000000', [
          {value: '540202000000', label: '桑珠孜区'},
          {value: '540221000000', label: '南木林县'}
        ]],
      ]),
      // 配置
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      }
    }
  },
  methods: {
    setOptionsByLevel(level) {
      this.optVal = []
      this.setOptions(this.opt, this.optVal)
      this.options = JSON.parse(JSON.stringify(this.optVal))
      console.log(this.options)
      if (level == 1) {
        this.options.forEach(o => {
          o.children = null
        })
      } else {
        this.options.forEach(o => {
          o.children = []
        })
      }
    },
    setOptions(input, output) {
      // output = []
      input.forEach((e,i) => {
        output.push({
          value: `${i}:${e.value}:${e.label}`,
          label: e.label
        })
        if (e.children && e.children.length) {
          output[i].children = []
          this.setOptions(e.children, output[i].children)
        }
      })
      console.log('options', output, this.options)
    },
    // 点击后显示子级，[]时显示空白
    activeItemChange(arr) {
      console.log('activeItemChange', arr)
      if (arr.length === 1) {
        let provinceIndex = arr[0].split(':')[0]
        let provinceVal = arr[0].split(':')[1]
        console.log('province', provinceIndex, provinceVal)
        console.log(this.citiesMap.get(provinceVal))
        let citiesData = this.citiesMap.get(provinceVal)
        if (this.level === 2) {
          console.log('level', this.level)
          // 2级时，点击2级，value不包括index，没有children
          citiesData = citiesData.map(c => {
            return {
              value: `${c.value}:${c.label}`,
              label: c.label,
            }
          })
        } else if (this.level === 3) {
          console.log('level', this.level)
          // 3级时，点击2级，value包括index，children为[]
          citiesData = citiesData.map((c,i) => {
            return {
              value: `${i}:${c.value}:${c.label}`,
              label: c.label,
              children: []
            }
          })
        }
        if (!this.options[provinceIndex].children.length) {
          console.log('citiesData', citiesData)
          this.$set(this.options[provinceIndex], 'children', citiesData)
        }
      } else if (arr.length === 2) {
        // 只有3级时执行
        let provinceIndex = arr[0].split(':')[0]
        let cityIndex = arr[1].split(':')[0]
        let cityVal = arr[1].split(':')[1]
        console.log('city', cityIndex, cityVal)
        console.log(this.districtsMap.get(cityVal))
        let districtsData = this.districtsMap.get(cityVal)
        districtsData = districtsData.map(d => {
          return {
            value: `${d.value}:${d.label}`,
            label: d.label
          }
        })
        if (!this.options[provinceIndex].children[cityIndex].children.length) {
          console.log('districtsData', districtsData)
          this.$set(this.options[provinceIndex].children[cityIndex], 'children', districtsData)
        }
      }
    },
    // 点击后下拉框隐藏时触发（非change-on-select，最后一级触发）
    change(item) {
      console.log('change', item)
    }
  },
  mounted() {
    // level = 1 or 2 or 3 or 4
    this.level = 3
    this.setOptionsByLevel(this.level)
    console.log('level', this.level)
  }
}
</script>

<style>

</style>
