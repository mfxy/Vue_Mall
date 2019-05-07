<template>
  <div>
     <!-- change-on-select -->
    <el-cascader :options="options" :props="props" clearable @change="change"
                 @active-item-change="activeItemChange">
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
      } else if (level == 2) {
        this.options.forEach(o => {
          o.children.forEach(e => {
            e.children = null
          })
        })
      }
    },
    setOptions(input, output) {
      // output = []
      input.forEach((e,i) => {
        output.push({
          value: `${e.value}:${e.label}`,
          label: e.label
        })
        if (e.children && e.children.length) {
          output[i].children = []
          this.setOptions(e.children, output[i].children)
        }
      })
      console.log('options', output, this.options)
    },
    change(e) {
      console.log('change', e)
    },
    activeItemChange(item) {
      console.log('activeItemChange', item)
    }
  },
  mounted() {
    let level = 3
    this.setOptionsByLevel(level)
  }
}
</script>

<style>

</style>
