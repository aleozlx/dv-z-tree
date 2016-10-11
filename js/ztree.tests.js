var ztree = ztree || {};

ztree.tests = [
    function(){
        return {isValid: new ztree.Transformation(3).transform(3,2) == 14};
    },
    function(){
        return {isValid: new ztree.Transformation(3).inverse(14).toString()=="3,2"};
    },
    function(){
        return new ztree.Transformation(3).validate();
    },
    function(){
        return new ztree.Transformation(3, [
            function(i, j){ return i+i+j; },
            function(z){ return [[0,0],[0,1],[1,0],[1,1]][z]; }
        ]).validate();
    },
    function(){
        return new ztree.Transformation(6).validate();
    }
];

ztree.tests.runAll = function(){
    var ct=0, N=ztree.tests.length;
    for(var i=0;i<N;++i){
        console.log('Test ['+(i+1)+']');
        if(ztree.tests[i]().isValid){
            console.info('PASS');
            ++ct;
        }
        else console.warn('FAIL');
    }
    console.info('PASS '+ct+'/'+N);
};
