// ✏️ MỌI CÂU CHỮ VÀ ĐƯỜNG DẪN ẢNH NẰM Ở ĐÂY.
// Ảnh: bỏ file vào thư mục public/photos/ rồi ghi "/photos/ten-file.jpg".
// Ảnh chưa có thì trang hiện ô giữ chỗ ghi sẵn tên file cần thêm.

export const info = {
  name: "Phạm Phương Nam",
  shortName: "Phương Nam",
  school: "Trường Đại học FPT",
  major: "Kỹ thuật phần mềm",
  cohort: "Khoá 2022 – 2026",
  // giờ bắt đầu buổi lễ, dùng cho đồng hồ đếm ngược và nút "Thêm vào lịch"
  start: "2026-11-07T12:30:00+07:00",
  end: "2026-11-07T14:00:00+07:00",
  dateText: "Thứ 7, 07.11.2026",
  timeText: "12h30 - 14h00",
  venue: "Sảnh trống đồng - Trường Đại học FPT",
  address: "7 Đ. D1, phường Tăng Nhơn Phú, Thành phố Hồ Chí Minh",
  mapUrl: "https://maps.app.goo.gl/zMqQNeqvxwT51Hd98",
  contact: "0915533944",
};

export const hero = {
  eyebrow: "Thiệp mời · Lễ tốt nghiệp 2026",
  portrait: "/photos/portrait.jpg",
  background: "/photos/mountain.jpg", // ảnh nền phần đầu và cuối trang
  portraitCaption: "Class of 2026",
  tagline:"Been a long journey, I've learned a lot",
  marquee: ["Class of 2026", "Redbull", "Deadline", "Laptop", "PRX", "MCK"],
};

// ✏️ chú thích dưới từng ảnh trên báo, ghi theo tên file trong src/moments
// ảnh nào không có dòng ở đây thì hiện "Khoảnh khắc <số>"
const captions: Record<string, string> = {
  "a1.jpg": "Malaysia trip",
  "a2.jpg": "Môn code đầu tiên",
  "a3.jpg": "Con Hẹ ",
  "a4.jpg": "Đi học ké mấy ae GD",
  "a5.jpg": "Môn code tay",
  "a6.jpg": "IOT stuff",
  "a7.jpg": "Toán silver flag",
  "a8.jpg": "1 trong nhiều đêm đi net \"học bài\"",
  "a9.jpg": "Thể thao tôi iêu",
  "a10.jpg": "Như ảnh",
  "a11.jpg": "Peak Triết Học",
  "a12.jpg": "Mùa thi discord",
  "a13.jpg": "EXE201",
  "a14.jpg": "Không thể đạt được nếu thiếu E =]",
  "a15.jpg": "Lịch học",
  "a16.jpg": "Random api",
  "a17.jpg": "Mẹp",
  "a18.jpg": "Long Đô La",
  "a19.jpg": "Capsule ",
  "a20.jpg": "Vovinam =))",
  "a21.jpg": "Bon chang linh ngu lam",
  "a22.jpg": "Photobooth sự kiện Triết học",
  "a23.jpg": "Tam thái tử",
  "a24.jpg": "The End!",
};

export const moments = {
  title: "Breaking News",
  text: "Random shi about my university life.",
  // mọi ảnh bỏ vào src/moments tự lên báo, xếp theo tên file (a1, a2, ... a10); ảnh đầu tiên là ảnh trang nhất
  photos: Object.entries(import.meta.glob<string>("./moments/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}", { eager: true, import: "default" }))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src], i) => ({ title: captions[path.split("/").pop()!] ?? `Khoảnh khắc ${i + 1}`, thumbnail: src })),
  // trích dẫn dưới tin trang nhất
  quote: {
    text: "Biết ơn những người đã rời đi, trân trọng những người còn ở lại. Cảm ơn quá khứ - hiện tại - tương lai. Và mong cho giây phút này còn tồn tại mãi mãi. Yeah I feel blessed.",
    author: "Nghiêm Vũ Hoàng Long - MCK",
  },
  // các bài báo xen giữa ảnh; bài đầu là tin trang nhất
  stories: [
    { headline: "Tân sinh viên năm nào nay đã tốt nghiệp", text: "Từ những chuyến đi, những môn học, cậu đã gặp được rất nhiều bạn bè, những người đã cùng cậu trải qua những kỷ niệm đáng nhớ." },
    { headline: "Deadline: kẻ thù chung", text: "Nguồn tin giấu tên cho biết phần lớn bài tập được nộp lúc 23:59." },
    { headline: "Tiệm net vẫn là phòng học hiệu quả nhất", text: "White noise tự nhiên, học mệt có thể nghỉ ngay." },
    { headline: "Bạn bè là tài sản lớn nhất", text: "Thứ đáng giá nhất mang về sau bốn năm không nằm trong bảng điểm." },
    { headline: "Ngủ đủ 8 tiếng vẫn là truyền thuyết", text: "Giới chuyên gia chưa tìm được sinh viên nào làm được điều này." },
  ],
};

export const invitation = {
  title: "Trân trọng kính mời",
  text: "Sự có mặt của bạn là món quà ý nghĩa nhất trong ngày quan trọng này.",
  cover: "./photos/invitation2.jpg",
};
