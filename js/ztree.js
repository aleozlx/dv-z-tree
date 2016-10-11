var ztree = ztree || {};

ztree.Transformation = function(level, kernel){
    this.dim = level - 1;
    if(kernel == undefined && level <= 5)
        ztree.useFastZIndexing(this);
    else{
        this.a = new Array(this.dim);
        this.a2 = new Array(this.dim);
        for(var i=0, t=1;i<this.dim;++i, t<<=1){
            this.a[i]=t; this.a2[i]=t*t;
        }
        if(kernel){ this.kernel = kernel[0]; this.inv = kernel[1]; }
        else{
            this.kernel = function(i, j){ return i+i+j; };
            this.inv = function(z){ return [[0,0],[0,1],[1,0],[1,1]][z]; };
        }
    }
};

ztree.Transformation.prototype.transform = function(i, j){
    var bi = new Array(this.dim), bj = new Array(this.dim), k;
    for(k=this.dim;k--;){
        var t = this.a[k];
        if(i-t>=0){ bi[k]=1; i-=t; }
        else { bi[k]=0; }
        if(j-t>=0){ bj[k]=1; j-=t; }
        else { bj[k]=0; }
    }
    var s = 0;
    for(k=0;k<this.dim;k++)
        s+=this.a2[k]*this.kernel(bi[k], bj[k]);
    return s;
};

ztree.Transformation.prototype.inverse = function(z){
    var b = new Array(this.dim), k;
    for(k=this.dim;k--;){
        var t = this.a2[k];
        b[k] = Math.floor(z / t);
        z %= t;
    }
    var si = 0, sj = 0;
    for(k=0;k<this.dim;k++){
        var v = this.inv(b[k]);
        if(v[0]) si+=this.a[k];
        if(v[1]) sj+=this.a[k];
    }
    return [si, sj];
};

ztree.getZHierarchy = function(z, level){
    var b = new Array(level - 1);
    for(var k = level - 1;k--;){
        var t = (1<<k); t *= t;
        b[k] = [[Math.floor(z / t), k],1];
        z %= t;
    }
    return b;
};

var H=ztree.getZHierarchy(14,5);
for(var ii=0;ii<H.length;++ii)
console.log(H[ii][0]);

ztree.Transformation.prototype.validate = function(){
    var ct=0, N=this.dim*this.dim;
    for(var z=0;z<N;z++) {
        var t=this.inverse(z);
        if(this.transform(t[0], t[1])==z) ++ct;
    }
    return {accuracy: ct / N, isValid: ct / N==1};
};

ztree.useFastZIndexing = function(transformation){
    delete transformation.kernel, transformation.inv;
    const dilation = [0,1,4,5,0x10,0x11,0x14,0x15,0x40,0x41,0x44,0x45,0x50,0x51,0x54,0x55],
        undilation = {0:0,1:1,4:2,5:3,0x10:4,0x11:5,0x14:6,0x15:7,0x40:8,0x41:9,0x44:10,0x45:11,0x50:12,0x51:13,0x54:14,0x55:15};
    transformation.transform = function(i, j){ return (dilation[i]<<1)|dilation[j]; };
    transformation.inverse = function(z){ return [undilation[(z&0xAA)>>1],undilation[z&0x55]]; };
};
