const calculateCost = (buying, containers) => {
  let finalCost = buying.docFee + buying.adminFee;
  containers.map(container => {
    buying.oceanFreight.map((ocf, ind) => {
      if (ocf.containerType === container.containerType) {
        finalCost += (buying.oceanFreight[ind] * container.quantity);
      }
    })
  })
  return finalCost;
}

module.exports = calculateCost;