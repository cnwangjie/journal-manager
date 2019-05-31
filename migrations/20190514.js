const assert = require('assert')
const {Journal, Inventory, Paper, Keyword, Subscription, User} = require('../src/models')

const journalsData = [
  ['自动化学报', '中国自动化学会', '11-1826/TP', '北京', '0254-4156', '2-180', '月刊'],
  ['统计研究', '中国统计学会', '11-1302/C', '北京', '1002-4565', '82-14', '月刊'],
  ['计算机学报', '中国科学院计算技术研究所', '11-1826/TP', '北京', '0254-4164', '2-833', '月刊'],
]

const paperData = `自动化学报 2017 43 1 平行学习—机器学习的一个新型理论框架 李力,林懿伦,曹东璞,郑南宁,王飞跃 机器学习|人工智能|平行学习|平行智能|平行系统及理论 1~8
自动化学报 2017 43 1 基于庞特里亚金极小值原理的多运载体有限时间编队控制 耿志勇 有限时间|编队控制|一致性|多运载体|极小值原理 40~59
自动化学报 2017 43 1 基于计算实验的公共交通需求预测方法 陈曦,彭蕾,李炜 计算实验|交通需求预测|Agent|BDI模型 60~71
统计研究 2014 31 1 大数据时代对统计学的挑战 邱东 大数据|信息|噪声|数据科学|统计学 16~22
计算机学报 2015 38 8 基于粒计算的大数据处理 徐计,王国胤,于洪 粒计算|大数据|云计算|深度学习 1497~1517
计算机学报 2015 38 8 半监督学习 刘建伟,刘媛,罗雄麟 半监督学习|有类标签的样本|无类标签的样例|类标签|成对约束 1592~1617`.split('\n').map(i => i.split(' '))

const inventoryData = `自动化学报,2017,43,1,章三
自动化学报,2017,43,2
自动化学报,2017,40,3
计算机学报,2017,40,1
计算机学报,2017,31,2
统计研究,2014,38,1,汪五
计算机学报,2015,38,8,里四`.split('\n').map(i => i.split(','))

const subscriptionData = `2-180,2018
82-14,2018
2-833,2018
2-180,2017
82-14,2017
2-833,2017
2-180,2016
82-14,2016
2-833,2016`.split('\n').map(i => i.split(','))

const main = async () => {
  console.log('migrating...')
  const initJournals = journalsData.map(async ([name, sponsor, cn, location, issn, code, period]) => {
    return await Journal.findOneAndUpdate({name, cn}, {name, sponsor, cn, location, issn, code, period}, {upsert: true, useFindAndModify: false})
  })
  await Promise.all(initJournals)
  console.log('init journals done')

  const initInventory = inventoryData.map(async ([journal_name, year, phase, season, borrower]) => {
    const journal = await Journal.findOne({name: journal_name})
    assert.notEqual(journal, null, `journal ${journal_name} not exists`)
    let borrower_id
    if (borrower) {
      const user = await User.findOneAndUpdate({name: borrower}, {name: borrower}, {new: true, upsert: true, useFindAndModify: false})
      borrower_id = user._id
    }
    
    return await Inventory.findOneAndUpdate({journal_id: journal._id, year, phase, season}, {journal_id: journal._id, year, phase, season, borrower_id}, {upsert: true, useFindAndModify: false})
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
      return Keyword.findOneAndUpdate({name: keyword}, {name: keyword}, {upsert: true, useFindAndModify: false})
    })
    const keywordIds = (await Promise.all(initKeywords)).map(({_id}) => _id)

    return await Paper.create({inventory_id: inventory._id, title, author, page, keywords: keywordIds})
  })
  await Promise.all(initPapers)
  console.log('init paper done')

  const initSubscriptions = subscriptionData.map(async ([code, year]) => {
    const journal = await Journal.findOne({code})
    assert.notEqual(journal, null, `journal with code: ${code} not exists`)

    return await Subscription.findOneAndUpdate({journal_id: journal._id, year}, {journal_id: journal._id, year}, {upsert: true, useFindAndModify: false})
  })
  await Promise.all(initSubscriptions)
  console.log('init subscription done')
}

module.exports = main
