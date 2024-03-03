class OverviewService {
  constructor(ctx) {
    this.logger = ctx.logger;
    this.db = ctx.db;
  }

  async getOverview() {
    try {
      const age = await this.db.getAvgSpentAmountsByParam('age');
      const gender = await this.db.getAvgSpentAmountsByParam('gender');
      const home = await this.db.getAvgSpentAmountsByParam('home');
      const married = await this.db.getAvgSpentAmountsByParam('married');
      const location = await this.db.getAvgSpentAmountsByParam('location');
      const children = await this.db.getAvgSpentAmountsByParam('children');
      const history = await this.db.getAvgSpentAmountsByParam('history');
      const salary = await this.db.getAvgSpentAmountsBySalaryRange(5);
      const result = {
        age: this.normalizeAvgSpentData(age),
        gender: this.normalizeAvgSpentData(gender),
        home: this.normalizeAvgSpentData(home),
        married: this.normalizeAvgSpentData(married),
        location: this.normalizeAvgSpentData(location),
        children: this.normalizeAvgSpentData(children),
        history: this.normalizeAvgSpentData(history),
        salary: this.normalizeAvgSpentData(salary),
      };
      const categories = this.getBestBuyerCategories(result);
      return { ...result, categories };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  normalizeAvgSpentData(data) {
    if (!data?.length) {
      return [];
    }
    return data.reduce((accumulator, item) => {
      if (item.avgSpent && (item._id !== undefined)) {
        const key = item._id.min && item._id.max
          ? `$${Math.round(item._id.min / 1000)}K - $${Math.round(item._id.max / 1000)}K`
          : item._id;
        const avgSpent = Math.round(item.avgSpent);
        return [...accumulator, { key, avgSpent }];
      }
      return accumulator;
    }, []).toSorted((a, b) => b.avgSpent - a.avgSpent);
  }

  getBestBuyerCategories(data) {
    const values = Object.values(data);
    const combinations = this.getCartezianProduct(values);
    const avgSpentCombinations = combinations.map((combination) => {
      const avgSpentSum = combination.reduce((sum, category) => sum + category.avgSpent, 0);
      const avgSpent = avgSpentSum / combination.length;
      return {
        age: combination[0].key,
        gender: combination[1].key,
        home: combination[2].key,
        married: combination[3].key,
        location: combination[4].key,
        children: combination[5].key,
        history: combination[6].key,
        salary: combination[7].key,
        avgSpent,
      };
    }).toSorted((a, b) => b.avgSpent - a.avgSpent);
    return avgSpentCombinations.slice(0, 10);
  }

  getCartezianProduct(arr) {
    return arr.reduce((a, b) => a.flatMap((x) => b.map((y) => x.concat(y))), [[]]);
  }
}

export default OverviewService;
