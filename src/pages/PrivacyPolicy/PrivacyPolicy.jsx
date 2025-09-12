import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        Privacy Policy
      </h1>

      {/* Introduction */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">Introduction</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>We value your privacy and are committed to protecting your personal data.</li>
        <li>By using our services, you agree to the practices outlined in this policy.</li>
      </ul>

      {/* Data Collection */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">Data Collection</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>Personal Information: name, email, and account details.</li>
        <li>Usage Data: IP address, browser type, device information.</li>
        <li>Cookies for user experience and analytics.</li>
      </ul>

      {/* Data Usage */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">How We Use Data</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>To improve our services and personalize your experience.</li>
        <li>To send notifications, offers, and important updates.</li>
        <li>To maintain system security and prevent fraud.</li>
      </ul>

      {/* Data Sharing */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">Data Sharing</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>We do not sell or trade personal data.</li>
        <li>Data may be shared with trusted third parties (e.g., payment gateways).</li>
      </ul>

      {/* User Rights */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">User Rights</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>Access, update, or delete your personal data anytime.</li>
        <li>Control cookie preferences via browser settings.</li>
      </ul>

      {/* Security */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">Data Security</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>We use encryption and secure protocols to protect your data.</li>
        <li>No method of storage is 100% secure, but we take maximum precautions.</li>
      </ul>

      {/* Policy Updates */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">Policy Updates</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>We may update this Privacy Policy occasionally.</li>
        <li>Continued use of our services means you accept the latest version.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;

