GLOBAL['#FairKey#'] = (function(__initProps__) {
    const __global__ = this;
    return {
        fairProps: __initProps__,
        _count: 0,
        _list: [2, 4, 6, 8, 10],
        getTitle: function getTitle() {
            const __thiz__ = this;
            with(__thiz__) {
                return fairProps.__op_idx__('pageName');
            }
        },
    };
})(convertObjectLiteralToSetOrMap(JSON.parse('#FairProps#')));