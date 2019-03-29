var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());


var tokens = ["AjiteshToken", "ABCToken", "DEFToken", "HelloToken", "AdminToken"];
var t = "Token";
var shoesMetaData = { 
  "metadata":[
        {"ShoeType":"Formals, Casuals, Sports, Boots"},
        {"Brands":"Addidas, Nike, Puma, VanHeusan, Roadster, Cat, Diesel"},
        {"Quantity": "10, 56, 13, 34"},
        {"ShoeId": "1, 2, 3, 4"}
    ]};

var shoedata = {
    data: [
        {
            type: "Formals",
            unique_id: "1,2,3,4,5",
            color: "black, blue, black, red, yellow", 
            quantity: "2, 2, 2, 2, 2",  
            price: "10000, 15000, 2000, 3000, 4000",
            file: "1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg"  
        },
        {
            type: "Casuals",
            unique_id: "6,7,8,9,10",
            color: "black, blue, black, red, yellow", 
            quantity: "10, 10, 10, 10, 16",
            price: "2000, 3000, 10000, 4000, 6000",
            file: "6.jpg, 7.jpg, 8.jpg, 9.jpg, 10.jpg"
        },
        {
            type: "Sports",
            unique_id: "11,12,13,14,15",
            color: "black, blue, black, red, yellow", 
            quantity: "4, 3, 6, 0, 0",
            price: "8000, 10000, 1500, 4000, 3000",
            file: "11.jpg, 12.jpg, 13.jpg, 14.jpg, 15.jpg"        
        },
        {
            type: "Boots",
            unique_id: "16,17,18,19,20",
            color: "black, blue, black, red, yellow", 
            quantity: "15, 10, 5, 2, 2",
            price: "2000, 2500, 32000, 1500, 3000",
            file: "16.jpg, 17.jpg, 18.jpg, 19.jpg, 20.jpg"    
        }
    ]    
};
    /*Formals:[
        unique_id: "1,2,3,4,5",
        color: "black, blue, black, red, yellow", 
        quantity: "2, 2, 2, 2, 2"
        ],
    Casuals:[
        {unique_id: "6,7,8,9,10"},
        {color: "black, blue, black, red, yellow"}, 
        {quantity: "10, 10, 10, 10, 16"}
        ],
    Sports:[
        {unique_id: "11,12,13,14,15"},
        {color: "black, blue, black, red, yellow"}, 
        {quantity: "4, 3, 6, 0, 0"}
        ],
    Boots:[
        {unique_id: "16,17,18,19,20"},
        {color: "black, blue, black, red, yellow"}, 
        {quantity: "15, 10, 5, 2, 2"}
        ]
    };*/
app.get('/token/:foo', async(req, res) => {
    var name = req.params.foo.toString();
    var flag = 0;
    for(var i = 0; i<tokens.length; i++)
    {
        if(tokens[i] == name)
        {
            flag = 1;
            break;            
        }
    }
    if(flag == 0)
    {
        res.send("Wrong token");
    }
    else
    {
        res.send("Your token is correct");
    }
    console.log(name);
})

app.post('/token/:foo', async(req, res) => {
    var name = req.params;
    console.log("in the post func" + name.foo.toString());
    var token = name.foo.toString() + "Token";
    tokens.push(token); 
    res.send(token);    
})

app.get('/Products/:foo', async(req, res) => {
    res.send(shoesMetaData);    
})

app.get('/Products/ListProducts/:foo', async(req, res) =>{
    var shoeid = req.params.foo;
    var temp = (shoesMetaData.metadata[0].ShoeType).toString().trim().split(",");
    //console.log(shoesMetaData.metadata[0].ShoeType);
    if(shoeid < 1 || shoeid > temp.length)
    {
        res.send({"message": "Wrong id"});
    }
    else{
        //res.send(temp[shoeid - 1]);
        console.log("The temp is : " + temp);
        var a  = (temp[shoeid - 1]).toString();
        //res.send(shoedata.a);
        console.log("The value the a : " + a);
        res.send(shoedata.data[shoeid-1]);
        console.log(shoedata.data[shoeid-1]);
    }
})

app.post('/Products/select_shoe/:unique_shoe_id', async(req, res) =>{
    var id = (req.params.unique_shoe_id).toString().trim();
    console.log("id entered by user is : " + id);
    var flag = false;
    for(var i = 0; i<shoedata.data.length; i++){
        var temp = (shoedata.data[i].unique_id).trim().split(",");
        var count = 0;
        for(var j = 0; j<temp.length; j++)
        {
            if(temp[j] === id)
            {
                flag = true;
                break;
            }
            count = count + 1;
        }
        if(flag)
        {
            var t = shoedata.data[i].type;
            var c = shoedata.data[i].color.split(",");
            var q = shoedata.data[i].quantity.split(",");
            var p = shoedata.data[i].price.split(",");
            var f = shoedata.data[i].file.split(",");
            var msg = {
                type: t,
                color: c[count],
                quantity: q[count],
                price: p[count],
                file: f[count]
            };
            res.send(msg);
            console.log(msg);
            break;
        }
        count = 0;
    }
})

app.put('/Products/delete_product/:unique_shoe_id', async(req, res) => {
    var id = req.params.unique_shoe_id.toString();
    var flag = false;
    for(var i = 0; i<shoedata.data.length; i++){
        var temp = (shoedata.data[i].unique_id).trim().split(",");
        var count = 0;
        for(var j = 0; j<temp.length; j++)
        {
            if(temp[j] === id)
            {
                flag = true;
                break;
            }
            count++;
        }
        if(flag)
        {
            var t = shoedata.data[i].type;
            var c = shoedata.data[i].color.split(",");
            var q = shoedata.data[i].quantity.split(",");
            var p = shoedata.data[i].price.split(",");
            var f = shoedata.data[i].file.split(",");
            var msg = {
                type: t[count],
                color: c[count],
                quantity: q[count],
                price: p[count],
                file: f[count]
            };
            res.send({message: "Element Removed"});
            //console.log(msg);
            break;
        }
        count = 0;
    }   
})

app.put('/Products/add_products', async(req, res) => {
    var j_body = req.body; 
    res.send(j_body); 
    console.log(j_body);   
})
app.listen(3000);