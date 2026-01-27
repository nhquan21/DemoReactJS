Tìm hiểu
	- lifecycle (30p)
	- midlwave	(30p)
	
1 Auth (1h) 	
		- login (15p)
		- Phân quyền Admin/User (15p)
		- register (15p)
		- logout (15p)
2 Product (2h)
		-List 
			- Hiện thi dạng table (30p)
			- Delete (30p)
		- Edit/Create 
			- Thêm mới (30p)
			- Sửa (30p)

			
1 Initialization(Khởi tạo)
2 Mounting(In) 				ComponentWillMount(Component đc render trên màn hình lần đầu tiên)
								|
							render(Trả về jsx)
								|
							ComponentDidMount(Chạy sau khi component đã xuất hiện lên Dom ) 
								- Gọi API
								- setInterval / setTimeout
								- Thêm event listener
								- Thao tác DOM
3 Updating(Cập nhật)		props / state (Luồng tương tự nhưng không có bước componentWillReceiveProps)
								|
							componentWillReceiveProps()
								|
							shouldComponentUpdate(nextProps) (quyết định có render lại hay ko)
								|
							componentWillUpdate()
								|
							render()
								|
							componentDidUpdate(prevProps)(Chạy sau khi UI đã cập nhật)
								- Dùng để:
								- Gọi API khi props đổi
								- Sync dữ liệu
								- Thao tác DOM
4 Unmounting(Bị xoá khỏi DOM) componentWillUnmount(Chạy trước khi component bị xoá)
								- Nếu không cleanup → memory leak