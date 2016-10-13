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
    },
    function(){
        return ztree.tests.validate_z_hierarchy(ztree.getZHierarchy(14,4), ztree.tests._z_hierarchy_ans);
    },
    function(){
        return ztree.tests.validate_z_hierarchy(new ztree.Transformation(4).getHierarchy(14), ztree.tests._z_hierarchy_ans);
    }
];

ztree.tests._z_hierarchy_ans = [
    {highlight: "1,0,2,1", z_order:2, level:0},
    {highlight: "1,1,5,5", z_order:3, level:1},
    {highlight: "0,0,16,16", z_order:0, level:2}
];

ztree.tests.validate_z_hierarchy = function(y, t){
    var r = true;
    for(var ii=0;ii<t.length;++ii){
        r = r && y[ii].z_order == t[ii].z_order;
        r = r && y[ii].level == t[ii].level;
        r = r && y[ii].highlight.toString() == t[ii].highlight;
    }
    return {isValid: r};
};

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
