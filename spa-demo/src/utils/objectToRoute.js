const objectToRoute = (objectName, id) => {
  const maps = {
    admin: `/power/admin`,
    user: `/user/detail/${id}`,
  };
  return maps[objectName];
};

export default objectToRoute;
