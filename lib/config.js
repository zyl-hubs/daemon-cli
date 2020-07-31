const { get, set, unset, getAll } = require('./utils/rc');

module.exports = async (action, cmd) => {
  const [k, v] = cmd.args.slice(1);
  // console.log(action, k, v)
  switch (action) {
    case 'get':
      if (k) {
        let key = await get(k);
        console.log(key)
      } else {
        let obj = await getAll();
        Object.keys(obj).forEach(key => {
          console.log(`${key}=${obj[key]}`)
        })
      }
      break;
    case 'set':
      set(k, v);
      break;
    case 'unset':
      unset(k);
      break;
    default:
      break;
  }
}
