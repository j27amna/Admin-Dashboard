export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
        {
            name: "firstname",
            title: "First Name",
            type: "string",
        },
        {
            name: "lastname",
            title: "Last Name",
            type: "string",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "contact",
            title: "Contact",
            type: "string",
        },
        {
            name: "address",
            title: "Address",
            type: "string",
        },
        {
            name: "city",
            title: "City",
            type: "string",
        },
        {
            name: "province",
            title: "Province",
            type: "string",
        },
        {
            name: "zip",
            title: "Zip Code",
            type: "string",
        },
        {
            name: "country",
            title: "Country",
            type: "string",
        },
        {
            name: "cartItems",
            title: "cartItems",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "product" }],
                },
            ],
        },
        {
            name: "total",
            title: "Total",
            type: "number",
        },
        {
            name: "discount",
            title: "Discount",
            type: "number",
        },
        {
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
        },        
        {
            name: "status",
            title: "Status",
            type: "string",
            options : {
                list : [
                    {title : "Pending", value : "pending"},
                    {title : "Processing", value : "processing"},
                    {title : "Delivered", value : "delivered"},
                    {title : "Cancelled", value : "cancelled"},
                ],
                layout : "radio"
            },
            initialValue : "pending"
        }
    ]
}