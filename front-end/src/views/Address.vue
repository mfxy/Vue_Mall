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
  name: 'Address',
  data() {
    return {
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
      // 所有街道
      streetsMap: new Map([
        // [parentOfDistrictCode, childrenOfStreet]
        // 内蒙古自治区 > 呼和浩特市 > 市辖区
        ['150101000000', null],
        // 内蒙古自治区 > 呼和浩特市 > 新城区
        ['150102000000', [
          {value: '150102001000', label: '海拉尔东路街道办事处'},
          {value: '150102002000', label: '锡林路街道办事处'}
        ]],
        // 内蒙古自治区 > 包头市 > 市辖区
        ['150201000000', null],
        // 内蒙古自治区 > 包头市 > 东河区
        ['150202000000', [
          {value: '150202001000', label: '和平街道办事处'},
          {value: '150202002000', label: '财神庙街道办事处'}
        ]],
        // 西藏自治区 > 拉萨市 > 市辖区
        ['540101000000', null],
        // 西藏自治区 > 拉萨市 > 城关区
        ['540102000000', [
          {value: '540102002000', label: '八廓街道办事处'},
          {value: '540102003000', label: '吉日街道办事处'}
        ]],
        // 西藏自治区 > 日喀则市 > 桑珠孜区
        ['540202000000', [
          {value: '540202001000', label: '城南街道办事处'},
          {value: '540202002000', label: '城北街道办事处'}
        ]],
        // 西藏自治区 > 日喀则市 > 南木林县
        ['540221000000', [
          {value: '540221100000', label: '南木林镇'},
          {value: '540221200000', label: '达那乡'}
        ]]
      ]),
      streetsObj: {
        // [parentOfDistrictCode, childrenOfStreet]
        // 内蒙古自治区 > 呼和浩特市 > 市辖区
        '150101000000': null,
        // 内蒙古自治区 > 呼和浩特市 > 新城区
        '150102000000': [
          {value: '150102001000', label: '海拉尔东路街道办事处'},
          {value: '150102002000', label: '锡林路街道办事处'}
        ],
        // 内蒙古自治区 > 包头市 > 市辖区
        '150201000000': null,
        // 内蒙古自治区 > 包头市 > 东河区
        '150202000000': [
          {value: '150202001000', label: '和平街道办事处'},
          {value: '150202002000', label: '财神庙街道办事处'}
        ],
        // 西藏自治区 > 拉萨市 > 市辖区
        '540101000000': null,
        // 西藏自治区 > 拉萨市 > 城关区
        '540102000000': [
          {value: '540102002000', label: '八廓街道办事处'},
          {value: '540102003000', label: '吉日街道办事处'}
        ],
        // 西藏自治区 > 日喀则市 > 桑珠孜区
        '540202000000': [
          {value: '540202001000', label: '城南街道办事处'},
          {value: '540202002000', label: '城北街道办事处'}
        ],
        // 西藏自治区 > 日喀则市 > 南木林县
        '540221000000': [
          {value: '540221100000', label: '南木林镇'},
          {value: '540221200000', label: '达那乡'}
        ]
      },
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
        this.options.forEach(a => {
          a.children = null
        })
      } else if (level == 2) {
        this.options.forEach(a => {
          a.children.forEach(b => {
            b.children = null
          })
        })
      } else if (level == 4) {
        this.options.forEach(a => {
          a.children.forEach(b => {
            b.children.forEach(c => {
              console.log(c.children)
              c.children = []
            })
          })
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
      if (arr.length === 3) {
        let provinceIndex = arr[0].split(':')[0]
        let cityIndex = arr[1].split(':')[0]
        let districtIndex = arr[2].split(':')[0]
        let districtVal = arr[2].split(':')[1]
        console.log('district', provinceIndex, cityIndex, districtIndex, districtVal)
        // console.log(this.streetsMap.get(districtVal))
        console.log(this.streetsObj[districtVal])
        let streetsData = this.streetsObj[districtVal]
        if (!this.options[provinceIndex].children[cityIndex].children[districtIndex].children.length) {
          this.$set(this.options[provinceIndex].children[cityIndex].children[districtIndex], 'children', streetsData)
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
    let level = 4
    this.setOptionsByLevel(level)
    console.log('st', this.streets)
    console.log('level', level)
  }
}
</script>

<style>

</style>
