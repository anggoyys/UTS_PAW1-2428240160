export const timeLogger = (_req, res, next) => {
    const timeStart = Date.now();

    res.on('finish', () => {
        const timeEnd = Date.now();
        const duration = timeEnd - timeStart;
        console.log({
            timeStart,
            timeEnd,
            duration: `${duration}ms`
        });
    });

    next();
}