# React + Vite

yarn to install node_modules

yarn dev to run project

yarn build to build project

1. Truy vấn toàn bộ dữ liệu
   const membersCollection = collection(db, 'members') // Tạo reference tới collection
   const querySnapshot = await getDocs(membersCollection) // Lấy dữ liệu

2. Truy vấn với điều kiện (ví dụ: age > 20)
   const usersCollection = collection(db, 'users');
   const q = query(usersCollection, where("age", ">", 20)); // Tạo query
   const querySnapshot = await getDocs(q);

3. Sắp xếp (ví dụ: theo age tăng dần)
   const usersCollection = collection(db, 'users');
   const q = query(usersCollection, orderBy("age"));
   const querySnapshot = await getDocs(q);

4. Giới hạn số lượng (ví dụ: 10 user đầu tiên)
   const usersCollection = collection(db, 'users');
   const q = query(usersCollection, limit(10));
   const querySnapshot = await getDocs(q);

5. Kết hợp nhiều điều kiện (ví dụ: age > 20 và city == "Hanoi")
   const usersCollection = collection(db, 'users');
   const q = query(usersCollection, where("age", ">", 20), where("city", "==", "Hanoi"));
   const querySnapshot = await getDocs(q);

6. Truy vấn theo thời gian thực (realtime)
   const usersCollection = collection(db, 'users');
   const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => { // unsubscribe để huỷ lắng nghe khi component unmount
   const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   setUsers(userList);
   });
   return () => unsubscribe(); // Clean up listener khi component unmount
