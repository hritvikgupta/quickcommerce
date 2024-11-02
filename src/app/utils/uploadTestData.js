import axios from 'axios';

const uploadTestData = async (businessName) => {
  try {
    // First, get the business record ID
    const businessResponse = await axios.get(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business Table?filterByFormula={Name}='${businessName}'`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
        }
      }
    );

    const businessId = businessResponse.data.records[0]?.id;
    if (!businessId) throw new Error('Business not found');

    // 1. Create Inventory Items
    const inventoryItems = [
      {
        fields: {
          "Business": [businessId],
          "Item Name": "Pizza Margherita",
          "Category": "Food",
          "Price": 299.00,
          "Stock Level": 50,
          "Low Stock Alert": 10,
          "Status": "In Stock"
        }
      },
      {
        fields: {
          "Business": [businessId],
          "Item Name": "Chicken Wings",
          "Category": "Food",
          "Price": 199.00,
          "Stock Level": 75,
          "Low Stock Alert": 15,
          "Status": "In Stock"
        }
      }
    ];

    const inventoryResponse = await axios.post(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Inventory`,
      { records: inventoryItems },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 2. Create Orders - Removed computed fields
    const orders = [
      {
        fields: {
          "Business": [businessId],
          "Customer Name": "John Doe",
          "Order Date": new Date().toISOString().split('T')[0],
          "Total Amount": 498.00,
          "Items Count": 2,
          "Status": "Pending",
          "Payment Method": "Card",
          "Delivery Address": "123 Main St, City",
          "Customer Phone": "+1234567890",
          "Processing Time": 15,
          "Delivery Time": 30,
          "Commission Amount": 49.80
        }
      }
    ];

    const ordersResponse = await axios.post(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Orders`,
      { records: orders },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 3. Create Order Items
    const orderItems = inventoryResponse.data.records.map((item) => ({
      fields: {
        "Order": [ordersResponse.data.records[0].id],
        "Item": [item.id],
        "Quantity": 1,
        "Unit Price": item.fields.Price,
        "Total Price": item.fields.Price,
        "Special Instructions": "No special instructions"
      }
    }));

    const orderItemsResponse = await axios.post(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Order Items`,
      { records: orderItems },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 4. Create Revenue Analytics
    const revenueAnalytics = {
      fields: {
        "Business": [businessId],
        "Date": new Date().toISOString().split('T')[0],
        "Daily Revenue": 498.00,
        "Order Count": 1,
        "Average Order Value": 498.00,
        "Commission Paid": 49.80,
        "Net Revenue": 448.20,
        "Growth Rate": 5.00
      }
    };

    const revenueResponse = await axios.post(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Revenue Analytics`,
      { records: [revenueAnalytics] },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 5. Create Customer Analytics
    const customerAnalytics = {
      fields: {
        "Business": [businessId],
        "Date": new Date().toISOString().split('T')[0],
        "Total Customers": 1,
        "New Customers": 1,
        "Repeat Customers": 0,
        "Average Items Per Order": 2,
        "Customer Satisfaction Score": 4.5
      }
    };

    const customerResponse = await axios.post(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Customer Analytics`,
      { records: [customerAnalytics] },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      inventory: inventoryResponse.data,
      orders: ordersResponse.data,
      orderItems: orderItemsResponse.data,
      revenue: revenueResponse.data,
      customer: customerResponse.data
    };

  } catch (error) {
    console.error('Error details:', error.response?.data);
    throw error;
  }
};

export default uploadTestData;