const assert = require('assert')
const {Journal, Inventory, Paper, Keyword} = require('../src/models')

const journalsData = [
  ['自动化学报', '中国自动化学会', '11-1826/TP', '北京', '0254-4156', '2-180', '月刊'],
  ['统计研究', '中国统计学会', '11-1302/C', '北京', '1002-4565', '82-14', '月刊'],
  ['计算机学报', '中国科学院计算技术研究所', '11-1826/TP', '北京', '0254-4164', '2-833', '月刊'],
]

const paperData = `自动化学报 2017 43 1 平行学习—机器学习的一个新型理论框架 李力林懿伦曹东璞郑南宁王飞跃 机器学习|人工智能|平行学习|平行智能|平行系统及理论 1~8
自动化学报 2017 43 1 基于庞特里亚金极小值原理的多运载体有限时间编队控制 耿志勇 有限时间|编队控制|一致性|多运载体|极小值原理 40~59
自动化学报 2017 43 1 基于计算实验的公共交通需求预测方法 陈曦彭蕾李炜 计算实验|交通需求预测|Agent|BDI模型 60~71
统计研究 2014 31 1 大数据时代对统计学的挑战 邱东 大数据|信息|噪声|数据科学|统计学 16~22
计算机学报 2015 38 8 基于粒计算的大数据处理 徐计王国胤于洪 粒计算|大数据|云计算|深度学习 1497~1517
计算机学报 2015 38 8 半监督学习 刘建伟刘媛罗雄麟 半监督学习|有类标签的样本|无类标签的样例|类标签|成对约束 1592~1617`.split('\n').map(i => i.split(' '))

const inventoryData = `自动化学报,2017,43,1
自动化学报,2017,43,2
自动化学报,2017,40,3
计算机学报,2017,40,1
计算机学报,2017,31,2
统计研究,2014,38,1
计算机学报,2015,38,8`.split('\n').map(i => i.split(','))

const main = async () => {
  console.log('migrating...')
  const initJournals = journalsData.map(async ([name, sponsor, cn, location, issn, code, period]) => {
    return await Journal.findOne({cn})
      || await Journal.create({name, sponsor, cn, location, issn, code, period})
  })
  await Promise.all(initJournals)
  console.log('init journals done')

  const initInventory = inventoryData.map(async ([journal_name, year, phase, season]) => {
    const journal = await Journal.findOne({name: journal_name})
    assert.notEqual(journal, null, `journal ${journal_name} not exists`)

    return await Inventory.findOne({journal_id: journal._id, year, season})
      || await Inventory.create({journal_id: journal._id, year, season})
  })
  await Promise.all(initInventory)
  console.log('init inventory done')

  const initPapers = paperData.map(async ([journal_name, year, phase, season, title, author, keywords, page]) => {
    const exists = await Paper.findOne({title})
    if (exists) return

    const journal = await Journal.findOne({name: journal_name})
    assert.notEqual(journal, null, `journal ${journal_name} not exists`)

    const inventory = await Inventory.findOne({journal_id: journal._id, year, season})
    assert.notEqual(journal, null, `inventory ${journal_name} ${year} ${season} not exists`)

    const initKeywords = keywords.split('|').map(async keyword => {
      return await Keyword.findOne({name: keyword}) || Keyword.create({name: keyword})
    })
    const keywordIds = (await Promise.all(initKeywords)).map(({_id}) => _id)

    return await Paper.create({inventory_id: inventory._id, title, author, page, keywords: keywordIds})
  })
  await Promise.all(initPapers)
  console.log('init paper done')
}

module.exports = main
