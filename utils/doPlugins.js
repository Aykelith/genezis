export default async (plugins, args, settings) => {
    if (!settings.runParallel) {
        for (let i=0, length=plugins.length; i < length; ++i) {
            try {
                await plugins[i](...args);
            } catch (error) {
                if (settings.onError) {
                    if (settings.onError.crashImmediatly) {
                        if (settings.onError.executePlugins) {
                            for (let j=0, length2=settings.onError.executePlugins.length; j < length2; ++j) {
                                await settings.onError.executePlugins[j](error, ...args);
                            }
                        }

                        throw settings.throw;
                    }
                }
            }
        }
    }
}