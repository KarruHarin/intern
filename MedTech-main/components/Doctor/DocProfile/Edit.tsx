import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  EditProfile,
  UpdateProfilePicture,
} from "@/actions/doctor-profile/Update";
import Image from "next/image";
import { useUser } from "@/app/context/userContext";

export default function Edit({ data, refresh, id }: any) {
  // State for managing profile image dialog
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(data?.image || "");

  // State for managing field edit dialog
  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [editField, setEditField] = useState<string | null>("");
  const [fieldValue, setFieldValue] = useState<string>("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const updateProfileImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("userId", id);

    const response = await fetch(`/api/v1/profile/profile-pic`, {
      method: "POST",
      body: formData,
    });
    setIsImageDialogOpen(false)
    refresh();
  };

  const openFieldDialog = (field: string) => {
    setEditField(field);
    // Initialize fieldValue with current field value
    setIsFieldDialogOpen(true);
  };

  const saveFieldValue = async () => {
    await EditProfile(id, editField, fieldValue);
    refresh();
    setIsFieldDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full md:w-[30vw]">
      <div>
        <h1 className="font-bold text-lg md:text-xl">Edit Profile</h1>
      </div>
      <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={data?.image || ""}
              alt="Profile Picture"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Change Photo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Select Profile Image</DialogTitle>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput">
                  <Button asChild variant="outline">
                    <span>Select Image</span>
                  </Button>
                </label>
                {previewImage && (
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={previewImage}
                      alt="Preview Image"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={updateProfileImage} disabled={!selectedFile}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-4">
          <div className="flex flex-col w-full">
            <div className="flex pb-2">
              <h1 className="text-sm md:text-md">Your Name</h1>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-sm md:text-md">{data?.name}</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    openFieldDialog("name");
                    setFieldValue(data?.name);
                  }}
                  className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex pb-2">
              <h1 className="text-sm md:text-md">Email</h1>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-sm md:text-md">{data?.email}</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    openFieldDialog("email");
                    setFieldValue(data?.email);
                  }}
                  className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex pb-2">
              <h1 className="text-sm md:text-md">Phone number</h1>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-sm md:text-md">{data?.phone}</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    openFieldDialog("phone");
                    setFieldValue(data?.phone);
                  }}
                  className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KYC Section */}
        <div className="flex flex-col gap-4 border-2 rounded-lg shadow-lg p-6">
          <div>
            <h1 className="text-sm md:text-md font-semibold">KYC</h1>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-sm md:text-md">KYC Status</h1>
              <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">
                View
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-sm md:text-md">KYC Details</h1>
              <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Field Dialog */}
      <Dialog
        open={isFieldDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditField("");
            setIsFieldDialogOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Edit {editField}</DialogTitle>
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <DialogFooter>
            <Button onClick={saveFieldValue} disabled={!fieldValue}>
              Save
            </Button>
            <Button
              onClick={() => setIsFieldDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
