const STORAGE_KEY = "sellerPoints";

export const initializePoints = (sellers) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const initialData = sellers.map((seller) => ({
      id: seller.id,
      name: seller.name,
      points: 0
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

export const getPoints = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const updatePoints = (sellerId, pointsToAdd) => {
  const data = getPoints();
  const updatedData = data.map((seller) =>
    seller.id === sellerId
      ? { ...seller, points: seller.points + pointsToAdd }
      : seller
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export const resetPoints = () => {
  localStorage.removeItem(STORAGE_KEY);
};
