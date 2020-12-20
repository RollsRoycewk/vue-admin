// export { default as login } from "./acl/login"; // {default: {}}
// export { default as user } from "./acl/user";
// export { default as role } from "./acl/role";
// export { default as permission } from "./acl/permission";
// export { default as category } from "./category";
// export { default as clientUser } from "./clientUser";
// export { default as order } from "./order";
// export { default as trademark } from "./product/trademark";
// export { default as attrs } from "./product/attrs";
// export { default as spu } from "./product/spu";
// export { default as sku } from "./product/sku";

const context = require.context(".", true, /\.js$/);

const api = context
  .keys()
  .map(modulePath => {
    const names = modulePath.split("/");
    let moduleName = names[2] && names[2].slice(0, -3);

    if (moduleName) {
      moduleName = moduleName === "index" ? names[1] : moduleName;
    }

    return {
      moduleName,
      modulePath
    };
  })
  .filter(module => module.moduleName)
  .reduce((modules, module) => {
    modules[module.moduleName] = context(module.modulePath).default;
    return modules;
  }, {});

console.log(api);
export default api;
