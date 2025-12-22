"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import {
    User, Mail, Globe, Building2, MapPin, Phone, Hash, KeyRound,
    DollarSign, Shield, CheckCircle, Bell, Loader2, UploadCloud,
    ArrowLeft, ChevronRight, AlertCircle, Calendar, Lock, CreditCard
} from "lucide-react";

import { useAdmindata } from "@/hooks/admin/query/adminQuery";
import { useAdminOnboarding } from "@/hooks/admin/mutation/adminMutation";
import { useRouter } from "next/navigation";

export default function AdminOnboarding() {
    const { data: adminData, isLoading } = useAdmindata();
    const { mutate: updateOnboarding, isPending } = useAdminOnboarding();
    const [currentStep, setCurrentStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const admin = adminData?.data;
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        reset,
        trigger,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            businessName: "",
            websiteUrl: "",
            address: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
            },
            notifications: {
                email: false,
                sms: false,
                whatsapp: false,
            },
        },
    });
    useEffect(() => {
        if (!admin) return;

        reset({
            name: admin.name || "",
            businessName: admin.businessName || "",
            websiteUrl: admin.websiteUrl || "",
            address: admin.address || {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
            },
            notifications: admin.notifications || {
                email: false,
                sms: false,
                whatsapp: false,
            },
        });
    }, [admin, reset]);

    const formData = useWatch({ control });
    const notifications = useWatch({ control, name: "notifications" });

    const onSubmit = async (data) => {
        // Only send updated/filled fields that match backend schema
        const payload = {
            name: data.name,
            businessName: data.businessName,
            websiteUrl: data.websiteUrl,
            address: {
                addressLine1: data.address.addressLine1,
                addressLine2: data.address.addressLine2,
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                pincode: data.address.pincode,
                phone: data.address.phone
            },
            notifications: {
                email: data.notifications.email,
                sms: data.notifications.sms,
                whatsapp: data.notifications.whatsapp
            },
            terms: {
                accepted: termsAccepted,
                acceptedAt: new Date(),
            }

        };

        // API call with mutation
        updateOnboarding(payload);
    };



    const steps = [
        { num: 1, label: "Profile" },
        { num: 2, label: "Business" },
        { num: 3, label: "Review" }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-black" />
                    <p className="text-gray-600 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* LOGO */}
            <div className="absolute top-6 left-6">
                <h1 className="text-2xl font-light tracking-tight text-black">Naina</h1>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* PROGRESS BAR */}
                <div className="flex items-center justify-center mb-16">
                    <div className="flex items-center gap-3">
                        {steps.map((step, idx) => (
                            <React.Fragment key={step.num}>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all ${currentStep === step.num
                                        ? 'bg-black text-white'
                                        : currentStep > step.num
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                                        }`}>
                                        {currentStep > step.num ? '✓' : step.num}
                                    </div>
                                    <span className={`text-xs font-medium ${currentStep >= step.num ? 'text-black' : 'text-gray-400'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className={`w-20 h-px mt-[-20px] ${currentStep > step.num ? 'bg-black' : 'bg-gray-200'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            {/* HEADER */}
                            <div className="text-center mb-12">
                                <h1 className="text-3xl font-light text-black mb-2 tracking-tight">
                                    Admin Profile Setup
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Let's start with your basic information
                                </p>
                            </div>

                            {/* AVATAR */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-24 h-24 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                                    {admin?.avatar ? (
                                        <img
                                            src={admin.avatar}
                                            alt="Admin Avatar"
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <User className="w-10 h-10 text-gray-300" />
                                    )}
                                </div>
                            </div>


                            {/* ACCOUNT INFO */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Account Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-medium">{admin?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">Role:</span>
                                        <span className="font-medium capitalize">{admin?.role}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">Joined:</span>
                                        <span className="font-medium">{new Date(admin?.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">2FA:</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${admin?.twoFactorEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                            {admin?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* FORM FIELDS */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                                        Full Name
                                    </label>
                                    <input
                                        {...register("name", { required: "Name required" })}
                                        className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors"
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-xs mt-2">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                                        Business Name
                                    </label>
                                    <input
                                        {...register("businessName", { required: "Business name required" })}
                                        className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors"
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                                        Website URL
                                    </label>
                                    <input
                                        {...register("websiteUrl")}
                                        className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors"
                                        placeholder="https://yourcompany.com"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    const valid = await trigger(["name", "businessName"]);
                                    if (valid) setCurrentStep(2);
                                }}
                                className="w-full bg-black text-white font-medium py-3 px-6 rounded text-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                Continue to Business Details
                                <ChevronRight className="w-4 h-4" />
                            </button>

                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-4 mb-12">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="flex-1 text-center">
                                    <h2 className="text-3xl font-light text-black tracking-tight">Business Details</h2>
                                    <p className="text-sm text-gray-500 mt-1">Address & notification preferences</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* ADDRESS */}
                                <div>
                                    <h3 className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-semibold flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Business Address
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-2 font-medium">Address Line 1</label>
                                            <input {...register("address.addressLine1")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="Street address, building name" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-2 font-medium">Address Line 2</label>
                                            <input {...register("address.addressLine2")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="Landmark, area" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-2 font-medium">City</label>
                                                <input {...register("address.city")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="Enter city" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-2 font-medium">State</label>
                                                <input {...register("address.state")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="Enter state" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-2 font-medium">Country</label>
                                                <input {...register("address.country")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="Country" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-2 font-medium">Pincode</label>
                                                <input {...register("address.pincode")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="Enter pincode" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-2 font-medium">Phone</label>
                                                <input {...register("address.phone")} className="w-full bg-white border border-gray-200 text-black py-3 px-4 rounded text-sm focus:border-black focus:outline-none transition-colors" placeholder="+91 XXXXX" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SUBSCRIPTION INFO */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Subscription Status
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600">Plan:</span>
                                            <span className="ml-2 font-medium">{admin?.subscription?.planName || 'No Plan'}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Status:</span>
                                            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${admin?.subscription?.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {admin?.subscription?.status || 'Inactive'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Trial:</span>
                                            <span className="ml-2 font-medium">{admin?.subscription?.isTrial ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Currency:</span>
                                            <span className="ml-2 font-medium">{admin?.subscription?.currency || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* NOTIFICATIONS */}
                                <div>
                                    <h3 className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-semibold flex items-center gap-2">
                                        <Bell className="w-4 h-4" />
                                        Notification Preferences
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { key: "email", label: "Email Notifications", desc: "Receive important updates via email" },
                                            { key: "sms", label: "SMS Alerts", desc: "Get OTP and critical alerts on your phone" },
                                            { key: "whatsapp", label: "WhatsApp Updates", desc: "Stay updated through WhatsApp messages" }
                                        ].map(({ key, label, desc }) => (
                                            <label key={key} className="flex items-center gap-3 p-4 rounded border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    {...register(`notifications.${key}`)}
                                                    className="w-4 h-4 rounded bg-white border-gray-300 accent-black"
                                                />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-black">{label}</div>
                                                    <div className="text-xs text-gray-500">{desc}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="flex-1 bg-gray-100 text-black py-3 px-6 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className="flex-1 bg-black text-white py-3 px-6 rounded text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                                >
                                    Review Details
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-4 mb-12">
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="flex-1 text-center">
                                    <h2 className="text-3xl font-light text-black tracking-tight">Review & Confirm</h2>
                                    <p className="text-sm text-gray-500 mt-1">Verify your information before completing</p>
                                </div>
                            </div>

                            {/* SUMMARY */}
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-sm font-semibold text-black mb-6">Profile Summary</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Full Name</span>
                                            <span className="text-black font-medium">{formData.name || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Business Name</span>
                                            <span className="text-black font-medium">{formData.businessName || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Email</span>
                                            <span className="text-black font-medium truncate ml-4">{admin?.email}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Website</span>
                                            <span className="text-black font-medium">{formData.websiteUrl || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Address Line 1</span>
                                            <span className="text-black font-medium">{formData.address?.addressLine1 || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Address Line 2</span>
                                            <span className="text-black font-medium">{formData.address?.addressLine2 || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">City</span>
                                            <span className="text-black font-medium">{formData.address?.city || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">State</span>
                                            <span className="text-black font-medium">{formData.address?.state || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Country</span>
                                            <span className="text-black font-medium">{formData.address?.country || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Pincode</span>
                                            <span className="text-black font-medium">{formData.address?.pincode || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Phone</span>
                                            <span className="text-black font-medium">{formData.address?.phone || "—"}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500">Account Status</span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${admin?.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                {admin?.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NOTIFICATION SUMMARY */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Active Notifications</h3>
                                <div className="flex flex-wrap gap-2">
                                    {notifications?.email && (
                                        <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded">Email</span>
                                    )}
                                    {notifications?.sms && (
                                        <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded">SMS</span>
                                    )}
                                    {notifications?.whatsapp && (
                                        <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded">WhatsApp</span>
                                    )}
                                    {!notifications?.email && !notifications?.sms && !notifications?.whatsapp && (
                                        <span className="text-gray-500 text-sm">No notifications enabled</span>
                                    )}
                                </div>
                            </div>

                            {/* TERMS */}
                            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-4 h-4 mt-0.5 rounded bg-white border-gray-300 accent-black"
                                />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-black mb-1">Accept Terms & Conditions</div>
                                    <p className="text-xs text-gray-500">
                                        I agree to the Platform Terms {admin?.terms?.version || "v1"} and Privacy Policy. Last updated on {new Date(admin?.updatedAt).toLocaleDateString()}.
                                    </p>
                                </div>
                            </label>

                            <div className="flex gap-4">
                                <button
                                    onClick={async () => {
                                        const valid = await trigger(["name", "businessName"]);
                                        if (valid) setCurrentStep(2);
                                    }}
                                >
                                    Edit Details
                                </button>

                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!termsAccepted || isPending}
                                    className="flex-1 bg-black text-white py-3 px-6 rounded text-sm font-medium hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Complete Setup
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}