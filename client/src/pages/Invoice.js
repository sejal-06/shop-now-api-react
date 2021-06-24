/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import easyinvoice from "easyinvoice";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import axios from "axios";
import demo from "./demo.pdf";
function Invoice() {
  var { index } = useParams();
  const [productarr, setproductarr] = useState([]);
  const [orderdate, setorderdate] = useState("");
  const [pdfdoc, setpdfdoc] = useState("");
  useEffect(async () => {
    try {
      const tokenStr = localStorage.getItem("token");
      var orderjson = await axios.get(
        `http://192.168.43.76:5000/shop/order/${index}`,
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );

      const order = orderjson.data.order;
      const prodarr = [];
      for (var i = 0; i < order.length - 1; i++) {
        var productbyidjson = await axios.get(
          `http://192.168.43.76:5000/shop/product/${order[i].productId}`,
          { headers: { Authorization: `Bearer ${tokenStr}` } }
        );
        const productbyid = productbyidjson.data.product;
        productbyid["description"] = productbyid["title"];
        prodarr.push({
          ...productbyid.data.product,
          quantity: order[i].quantity,
          tax: 0,
        });
      }
      setorderdate(order[order.length - 1].orderdate);
      setproductarr(prodarr);
    } catch (err) {}
  }, []);
  useEffect(() => {
    var data = {
      //"documentTitle": "RECEIPT", //Defaults to INVOICE
      currency: "INR",
      taxNotation: "gst", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      //"logo": 'shop_logo.jpg',
      logo: "https://previews.123rf.com/images/makkuro/makkuro1510/makkuro151000145/47163781-sale-colorful-shopping-cart-with-bags-isolated-on-white-background.jpg", //or base64
      //"logoExtension": "png", //only when logo is base64
      sender: {
        company: "Shop Now",
        address: "Sample Street 123",
        city: "Hyderabad",
        zip: "500005",
        country: "India",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      client: {
        company: "Client ",
        address: "Clientstreet 456",
        zip: "452009",
        city: "Indore",
        country: "India",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      invoiceNumber: Date.now(),
      invoiceDate: orderdate,
      products: productarr,
      bottomNotice: "Shop till you drop!!",
    };
    // console.log("here");
    easyinvoice.createInvoice(data, function (result) {
      //The response will contain a base64 encoded PDF file
      generateFile(data);
      //   setpdfdoc(result.pdf);
      //   console.log(result.pdf);
    });
  }, []);

  let generateFile = (content) => {
    // console.log("content", content); // here at console if i copy the code and use online tool(https://base64.guru/converter/decode/pdf) it shows the correct pdf
    // const blob = new Blob([content], { type: "application/pdf" });
    // const link = document.createElement("a");
    // link.href = window.URL.createObjectURL(blob);
    // link.download = "invoice";
    // link.click();

    const link = document.createElement("a");
    var _URL = window.URL || window.webkitURL;
    const blob = new Blob([content], { type: "application/pdf" });
    link.href = _URL.createObjectURL(blob);
    link.download = "invoice.pdf";
    link.click();
  };

  return (
    <div>
      <Document
        file={pdfdoc}
        // onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={1} width={1000} />
      </Document>
    </div>
  );
}

export default Invoice;
