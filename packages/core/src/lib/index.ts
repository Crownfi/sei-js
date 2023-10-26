// "/index.js" must be added everywhere here because the tsc team is being rigid in their design philosophies when
// handling esmodules. They believe that they shouldn't be editing string literals of any kind whatsoever. Which means
// we have to reference non-existant .js files that only exist after the build. But hey, Aritz jokes that TypeScript is
// a fake language, and now it seems the tsc team really want you to know that too.
export * from './queryClient/index.js';
export * from './signingClient/index.js';
export * from './wallet/index.js';
export * from './utils/index.js';
