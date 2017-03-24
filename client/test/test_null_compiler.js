// http://stackoverflow.com/a/38015613/830199
const noop = () => null;

require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;