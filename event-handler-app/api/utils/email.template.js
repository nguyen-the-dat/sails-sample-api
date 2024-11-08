const generateResetPasswordEmailTemplate = (otp) => {
  // Construct the HTML string using the template data
  return `
        <div style="background-color: #f8f8f8; font-family: Arial, sans-serif; color: #242424; padding: 20px;">
          <h1 style="text-align: center; color: #3d4852;">Yêu cầu đặt lại mật khẩu</h1>
          <p>Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu đăng ký cho tài khoản của bạn.</p>
          <div style="background-color: #edf2f7; font-size: 22px; font-weight: bold; text-align: center; color: #666; padding: 16px;">
            ${otp}
          </div>
          <p style="color: #FF0000;">Đừng gửi mã này cho bất cứ ai, chúng tôi sẽ không bao giờ liên hệ cho bạn để lấy mã này.</p>
          <p style="color: #777;">Nếu có bất cứ thắc mắc nào, hãy liên hệ với chúng tôi để được hỗ trợ.</p>
          <p>Trân trọng, <br> Đội ngũ phát triển</p>
        </div>
      `;
};

module.exports = generateResetPasswordEmailTemplate;
