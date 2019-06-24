export default async (plugins, args, settings) => {
    let arePluginsArray = Array.isArray(plugins);
    let _plugins = arePluginsArray ? plugins : Object.values(plugins);

    let answers;
    let pluginsNames;

    if (arePluginsArray) {
        answers = [];
    } else {
        answers = {};
        pluginsNames = Object.keys(plugins);
    }

    if (!settings.runParallel) {
        for (let i=0, length=_plugins.length; i < length; ++i) {
            try {
                const answer = await _plugins[i](...args);

                if (arePluginsArray) answers.push(answer);
                else                 answers[pluginsNames[i]] = answer;
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

    return answers;
};

export class PluginError extends Error {
    constructor(message, originalError) {
        super(message);

        this.name = this.constructor.name;

        this.originalError = originalError;

        Error.captureStackTrace(this, this.constructor);
    }
}