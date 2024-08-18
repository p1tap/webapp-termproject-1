export function processCarData(cars) {
  const brandModelCounts = {};
  const brandCounts = {};
  let totalValue = 0;
  let totalCars = 0;

  cars.forEach(car => {
    const brand = car.NameMMT.split(' ')[0];
    const model = car.Model;
    const price = parseInt(car.Prc.replace(/,/g, ''), 10);

    if (!brandModelCounts[brand]) {
      brandModelCounts[brand] = {};
      brandCounts[brand] = { count: 0, value: 0 };
    }

    if (!brandModelCounts[brand][model]) {
      brandModelCounts[brand][model] = { count: 0, value: 0 };
    }

    brandModelCounts[brand][model].count += 1;
    brandModelCounts[brand][model].value += price;
    brandCounts[brand].count += 1;
    brandCounts[brand].value += price;
    totalValue += price;
    totalCars += 1;
  });

  const averagePrice = totalValue / totalCars;
  const topBrand = Object.entries(brandCounts).reduce((a, b) => a[1].count > b[1].count ? a : b)[0];

  return { 
    brandModelCounts, 
    brandCounts,
    totalCars,
    totalValue,
    averagePrice,
    topBrand
  };
}