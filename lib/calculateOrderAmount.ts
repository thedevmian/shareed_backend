export const calculateOrderAmount = (bag: number[]): number => {
  const amount = bag.reduce((acc: number, item) => {
    return acc + item.product[0].price * item?.quantity;
  }, 0);

  const convertPLNToUSD = amount * 4.7;

  return convertPLNToUSD;
};
