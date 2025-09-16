import React from "react";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-center  text-yellow-500 mb-8">
        Terms & Conditions
      </h1>
      <Helmet>
        <title>TermsAndCondition || page</title>
      </Helmet>
      {/* Introduction */}
      <h2 className="text-xl font-bold  text-yellow-500 mb-2">Introduction</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>This website/app provides digital services and products.</li>
        <li>By accessing our platform, you agree to comply with these Terms.</li>
      </ul>

      {/* User Responsibilities */}
      <h2 className="text-xl font-bold  text-yellow-500 mb-2">
        User Responsibilities
      </h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>Provide accurate and updated information.</li>
        <li>Do not misuse the service for illegal or harmful activities.</li>
        <li>Respect intellectual property rights of others.</li>
      </ul>

      {/* Account Rules */}
      <h2 className="text-xl font-bold  text-yellow-500 mb-2">Account Rules</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>Users must keep login credentials secure and confidential.</li>
        <li>You are responsible for all activity under your account.</li>
      </ul>

      {/* Content Ownership */}
      <h2 className="text-xl font-bold  text-yellow-500 mb-2">
        Content Ownership
      </h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>All platform content is owned by the company unless stated otherwise.</li>
        <li>Users retain rights to their uploaded content but are fully responsible for it.</li>
      </ul>

      {/* Liability */}
      <h2 className="text-xl font-bold  text-yellow-500 mb-2">
        Limitation of Liability
      </h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>We are not responsible for losses due to technical issues or misuse.</li>
        <li>Use the service at your own risk.</li>
      </ul>

      {/* Termination */}
      <h2 className="text-xl font-bold  text-yellow-500 mb-2">Termination</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>We reserve the right to suspend or terminate accounts violating our Terms.</li>
      </ul>

      {/* Changes */}
      <h2 className="text-xl font-bold text-yellow-500 mb-2">Changes</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>These Terms may be updated anytime, and continued use means acceptance.</li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
