import React, { useEffect, useState } from "react";
import CategoryTable from "../../components/category/CategoryTable";
import { Button, Spin, message } from "antd";
import Search from "../../components/search/Search";
import style from "./CategoryPage.module.css";
import CategoryModal from "../../components/category/CategoryModal";
import errroHandler from "../../utils/ErrorHandler";
import request from "../../services/request";

const CategoryPage = () => {
  const CategoryForm = {
    id: "",
    name: "",
    order: "",
    description: "",
    file: "",
  };
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(CategoryForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  // GetList function
  const getList = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "categories/getList");
      setCategories(response.categories);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Insert function
  const insertCategory = async () => {
    if (validateError()) return;
    try {
      setLoading(true);
      let categoryData = new FormData();
      categoryData.append("name", form.name);
      categoryData.append("description", form.description);
      categoryData.append("sort_order", form.order);
      categoryData.append("file", form.file);
      const response = await request("POST", "categories/create", categoryData);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // update function
  const updateCategory = async () => {
    if (validateError()) return;
    try {
      setLoading(true);
      let categoryData = new FormData();
      categoryData.append("name", form.name);
      categoryData.append("description", form.description);
      categoryData.append("sort_order", form.order);
      categoryData.append("file", form.file);
      const response = await request(
        "PUT",
        `categories/update/${form.id}`,
        categoryData
      );
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete function

  const deleteCategory = async (id) => {
    if (!id) {
      message.error("មិនមានID!");
      return;
    }
    try {
      setLoading(true);
      const response = await request("DELETE", `categories/delete/${id}`);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // handle update
  const handleUpdate = (id, name, description, sort_order, image) => {
    setForm({ id, name, order: sort_order, description, file: image });
    setIsModalOpen(true);
  };
  // handle submit
  const handleSubmit = () => {
    if (!form.id) {
      insertCategory();
    } else {
      updateCategory();
    }
  };

  // handle cancel form
  const handleCancelForm = () => {
    setIsModalOpen(false);
    setForm({ id: "", name: "", order: "", description: "", file: "" });
  };

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  // Filter users based on search query
  const filteredUsers = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateError = () => {
    if (!form.name || form.name.length < 3) {
      message.error("សូមបញ្ចូលឈ្មោះប្រភេទទំនិញយ៉ាងតិច៣អក្សរ!");
      return true;
    }
  };
  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងប្រភេទទំនិញ</h3>
            <Search searchQuery={searchQuery} handleSearch={handleSearch} />
          </div>
          <div className={style.create}>
            <Button
              className={style.btn}
              type="primary"
              onClick={() => setIsModalOpen(true)}
            >
              បង្កើតប្រភេទទំនិញថ្មី
            </Button>
          </div>
        </div>
        <div>
          <CategoryTable
            categories={filteredUsers}
            handleUpdate={handleUpdate}
            handleDelete={deleteCategory}
          />
        </div>
      </main>
      <CategoryModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleCancelForm={handleCancelForm}
        form={form}
        setForm={setForm}
      />
    </Spin>
  );
};

export default CategoryPage;
