import { Form, Input, Button } from "antd";

const StaffDetail = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const user = {
    fullName: "danhyeye",
    password: "password",
    phone: "1234567890",
    dob: "01/01/2000",
    email: "danh@gmail.com",
    gender: "male",
  };

  return (
    <Form
      className="my-10 mx-10"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        initialValue={user.fullName}
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        initialValue={user.password}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        initialValue={user.phone}
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Date of Birth"
        name="dob"
        initialValue={user.dob}
        rules={[{ required: true, message: "Please enter your date of birth" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        initialValue={user.email}
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        initialValue={user.gender}
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="w-1/2">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StaffDetail;
