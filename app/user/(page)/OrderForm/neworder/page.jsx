"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  onChange,
  required = false,
  defaultValue,
  disabled = false,
}) => (
  <div className="space-y-2 md:w-1/2 w-full md:px-4">
    <label className="block text-gray-800 dark:text-gray-200 text-xs font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-600 px-2 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:dark:bg-gray-700"
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
      min={type === "number" ? 1 : undefined}
    />
  </div>
);

const SelectField = ({ label, name, options, onChange, required = false }) => (
  <div className="space-y-2  md:w-1/2 w-full md:px-4">
    <label className="block text-gray-800 dark:text-gray-200 text-xs font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        name={name}
        onChange={onChange}
        className="border border-gray-300 dark:border-gray-600  px-2 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300 appearance-none"
        required={required}
      >
        <option value=""  >Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1 text-gray-500 dark:text-gray-400 pointer-events-none">▼</span>
    </div>
  </div>
);



export { InputField, SelectField };

export default function OrderForm() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    transactionId: "",
    dscode: "",
    dsname: "",
    address: "",
    mobileno: "",
    shippingAddress: "",
    shippingmobile: "",
    shippinpPincode: "",
    paymentmod: "",
    salegroup: "",
    productDetails: [{ productgroup: "", product: "", quantity: "" }],
    shippingcharge: "",
    netamount: "",
    remarks: "",
    totalsp: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
        if (response.data?.name) {
          setFormData((prev) => ({
            ...prev,
            dscode: response.data.dscode || "",
            dsname: response.data.name || "",
            address: response.data.address?.addressLine1 || "",
            mobileno: response.data.mobileNo || "",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Unable to fetch user details.");
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, [session?.user?.email]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product/Product/fetch/s");
        if (response.data.success) {
          const products = response.data.data;
          setProducts(products);


          const uniqueGroups = [...new Set(products.map((item) => item.group))];
          setProductGroups(uniqueGroups);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev };

      if (index !== null) {
        const updatedProductDetails = [...prev.productDetails];
        updatedProductDetails[index] = {
          ...updatedProductDetails[index],
          [name]: value,
        };

        // Handle product selection
        if (name === "product") {
          const selectedProduct = products.find((p) => p.productname === value);
          if (selectedProduct) {
            updatedProductDetails[index] = {
              ...updatedProductDetails[index],
              product: value,
              quantity: updatedProductDetails[index].quantity || 1, // Default quantity = 1
              netamount: selectedProduct.dp * (updatedProductDetails[index].quantity || 1),
              sp: selectedProduct.sp || 0, // Store selling price
            };
          }
        }

        // Handle quantity change
        if (name === "quantity") {
          const selectedProduct = products.find(
            (p) => p.productname === updatedProductDetails[index].product
          );
          if (selectedProduct) {
            updatedProductDetails[index] = {
              ...updatedProductDetails[index],
              quantity: value,
              netamount: selectedProduct.dp * value,
              sp: selectedProduct.sp || 0, // Ensure selling price is stored
            };
          }
        }

        updatedData.productDetails = updatedProductDetails;

        // ✅ Calculate total net amount
        const totalNetAmount = updatedProductDetails.reduce(
          (sum, item) => sum + (parseFloat(item.netamount) || 0),
          0
        );

        // ✅ Calculate total SP (Selling Price)
        const totalSp = updatedProductDetails.reduce(
          (sum, item) =>
            sum + (parseFloat(item.sp) || 0) * (parseInt(item.quantity) || 0),
          0
        );

        // ✅ Calculate shipping charge
        const shippingCharge = totalNetAmount < 2000 ? 70 : 0;

        // ✅ Update netamount to include shipping charge
        updatedData.netamount = totalNetAmount + shippingCharge;
        updatedData.shippingcharge = shippingCharge;
        updatedData.totalsp = totalSp;

      } else {
        updatedData[name] = value;
      }

      return updatedData;
    });
  };




  // Add more products
  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      productDetails: [...prev.productDetails, { productgroup: "", product: "", quantity: "" }],
    }));
  };

  // Remove product row
  const removeProductRow = (index) => {
    setFormData((prev) => {
      const updatedProducts = prev.productDetails.filter((_, i) => i !== index);
      return { ...prev, productDetails: updatedProducts };
    });
  };



  const filteredProducts = formData.productgroup
    ? products.filter((item) => item.group === formData.productgroup)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentmod === "Online" && !formData.transactionId) {
      toast.error("Transaction ID is required for online payments!");
      return;
    }


    if (!formData.salegroup) {
      toast.error("Sale Group Require");
      return;
    }

    if (!formData.address) {
      toast.error("First Complete Your Profile Address Not Found");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/order/create", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:p-6 p-4 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-6xl">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">Order Form</h2>
      <Toaster />
      {fetching && <p className="text-center text-gray-600 dark:text-gray-300">Fetching user details...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className=" flex flex-wrap gap-y-4">
        <InputField label="Date" name="date" type="date" defaultValue={formData.date} disabled />
        <InputField label="Transaction ID" name="transactionId" placeholder="Enter Transaction ID" onChange={handleChange} />
        <InputField label="DS Code" name="dscode" defaultValue={formData.dscode} disabled required />
        <InputField label="DS Name" name="dsname" defaultValue={formData.dsname} disabled required />
        <InputField label="Address" name="address" defaultValue={formData.address} disabled required />
        <InputField label="Mobile" name="mobileno" defaultValue={formData.mobileno} disabled required />
        <InputField label="Shipping Address" name="shippingAddress" onChange={handleChange} required />
        <InputField label="Shipping Mobile" name="shippingmobile" type="tel" onChange={handleChange} required />
        <InputField label="Shipping Pincode" name="shippinpPincode" onChange={handleChange} required />
        <SelectField label="Medium of Payment" name="paymentmod" options={["Online", "Cash"]} onChange={handleChange} required />
        <div className="w-full bg-gray-100  dark:bg-gray-900 py-4 flex flex-wrap gap-y-4">
          {formData.productDetails.map((detail, index) => (
            <div key={index} className="w-full flex flex-wrap gap-y-4 items-center">
              {/* Product Group Dropdown */}
              <SelectField
                label="Product Group"
                name="productgroup"
                options={productGroups}
                value={detail.productgroup}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {detail.productgroup.length > 0 && (
                <SelectField
                  label="Product"
                  name="product"
                  options={
                    detail.productgroup
                      ? products
                        .filter((item) => item.group === detail.productgroup)
                        .map((p) => p.productname)
                      : []
                  }
                  value={detail.product}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              )}
              {detail.productgroup.length > 0 && (
                <InputField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={detail.quantity}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              )}
              {/* Remove Product Button */}
              {formData.productDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProductRow(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}


          <button
            type="button"
            onClick={addProductRow}
            className="bg-green-500 text-white px-4 py-2 m-2 rounded-md mt-2"
          >
            Add More Products
          </button>
        </div>



        <InputField
          label="Net Amount"
          name="netamount"
          defaultValue={formData.netamount}
          required
          disabled
        />
        <InputField label="Total SP" name="totalsp" defaultValue={formData.totalsp} disabled />
        <InputField label="Shipping Charge" name="shippingcharge" defaultValue={formData.shippingcharge} disabled />

        <SelectField label="Sale Group" name="salegroup" options={["SAO", "SGO"]} onChange={handleChange} required />
        <textarea name="remarks" onChange={handleChange} placeholder="Remarks (Optional)" className="w-full p-2 placeholder-gray-400 dark:placeholder:text-white border rounded"></textarea>

        <div className="col-span-2 w-full flex justify-center">
          <button type="submit" disabled={isSubmitting} className={`px-6 py-3 w-full rounded-lg font-semibold transition-all duration-300 ${isSubmitting
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
            }`}>
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
