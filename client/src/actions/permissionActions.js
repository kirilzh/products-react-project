const fetchPermissions = async () => {
  const response = await fetch("/permissions");
  const data = await response.json();
  console.log(data.permissions);
};


export default fetchPermissions;