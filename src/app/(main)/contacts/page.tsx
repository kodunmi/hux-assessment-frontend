"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import requests from "@/utils/http";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiEyeFill, RiPencilLine, RiDeleteBin2Line } from "react-icons/ri";

interface FormData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

interface IContact {
  id: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Function to add ordinal suffix to day
  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${
    monthNames[monthIndex]
  } ${year}`;

  return formattedDate;
}

const Home = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const {
    handleSubmit: handleSubmitEdit,
    register: registerEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
    setValue,
  } = useForm<FormData>();

  const setEditModal = (contact: IContact) => {
    setSelected(contact);
    setValue("phoneNumber", contact.phoneNumber);
    setValue("lastName", contact.lastName);
    setValue("firstName", contact.firstName);

    (window as any).my_modal_6.showModal();
    return;
  };

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<IContact | undefined>(undefined);

  const {
    isLoading: gettingContact,
    error,
    data,
  } = useQuery<{ contacts: IContact[] }, Error>({
    queryKey: ["contacts"],
    queryFn: async () =>
      requests
        .get<{ data: { contacts: IContact[] } }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts`
        )
        .then((res) => res.data),
  });

  console.log(data?.contacts);

  const closeRef = useRef<HTMLButtonElement>(null);

  const createContact = async (data: FormData) =>
    await requests.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts`,
      data
    );

  const deleteContact = async (id: number) =>
    await requests.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts/${id}`
    );
  const editContact = async (data: FormData) =>
    await requests.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts/${selected?.id}`,
      data
    );

  const { mutate, isLoading } = useMutation({
    mutationFn: createContact,

    onSuccess: (e: any) => {
      notifySuccess("Contact Added");

      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      closeRef.current?.click();
      (window as any).my_modal_5.close();
      reset();
    },
    onError: (e: AxiosError<{ message?: string; error?: string }>) => {
      notifyError(
        (e.response?.data.message as string) ||
          (e.response?.data.error as string)
      );
      console.log(e.response);
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteContact(id),

    onSuccess: (e: any) => {
      notifySuccess("Contact Deleted");

      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (e: AxiosError<{ message?: string; error?: string }>) => {
      notifyError(
        (e.response?.data.message as string) ||
          (e.response?.data.error as string)
      );
      console.log(e.response);
    },
  });

  const editMut = useMutation({
    mutationFn: (data: { data: FormData }) => editContact(data.data),

    onSuccess: (e: any) => {
      notifySuccess("Contact Edited");

      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (e: AxiosError<{ message?: string; error?: string }>) => {
      notifyError(
        (e.response?.data.message as string) ||
          (e.response?.data.error as string)
      );
      console.log(e.response);
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      mutate(data);
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed");
    }
  };

  const onSubmitEdit: SubmitHandler<FormData> = async (data) => {
    try {
      editMut.mutate({
        data: data,
      });
      console.log("Edit successful");
    } catch (error) {
      console.error("Edit failed");
    }
  };
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box"
        >
          <button
            ref={closeRef}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => (window as any).my_modal_5.close()}
          >
            ✕
          </button>
          <div className="text-center">
            <h3 className="font-bold text-lg text-primary my-5 text-center">
              Create New Contact
            </h3>
          </div>
          <div className="w-full text-center">
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Phone Number"
                className="input-bordered input w-full"
                register={register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <Input
                type="text"
                placeholder="First Name"
                className="input-bordered input w-full"
                register={register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="mb-3">
              <Input
                className="input-bordered input w-full"
                placeholder="Last Name"
                type="text"
                register={register("lastName", {
                  required: "Phone number is required",
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </div>

            <Button
              isLoading={isLoading}
              type="submit"
              className="btn btn-primary w-full mt-4 max-w-xs"
            >
              Add Contact
            </Button>
          </div>
        </form>
      </dialog>

      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmitEdit(onSubmitEdit)}
          method="dialog"
          className="modal-box"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => (window as any).my_modal_6.close()}
          >
            ✕
          </button>
          <div className="text-center">
            <h3 className="font-bold text-lg text-primary my-5 text-center">
              Edit Contact
            </h3>
          </div>

          {selected && (
            <div className="w-full text-center">
              <div className="mb-3">
                <Input
                  //   value={selected.phoneNumber}
                  //   {...(selected ? { value: selected.phoneNumber } : {})}
                  type="text"
                  placeholder="Phone Number"
                  className="input-bordered input w-full"
                  register={registerEdit("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <Input
                  //   value={selected.firstName}
                  type="text"
                  placeholder="First Name"
                  className="input-bordered input w-full"
                  register={registerEdit("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <span className="text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <Input
                  //   value={selected.lastName}
                  className="input-bordered input w-full"
                  placeholder="Last Name"
                  type="text"
                  register={registerEdit("lastName", {
                    required: "Phone number is required",
                  })}
                />
                {errors.lastName && (
                  <span className="text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              <Button
                isLoading={editMut.isLoading}
                type="submit"
                className="btn btn-primary w-full mt-4 max-w-xs"
              >
                Edit Contact
              </Button>
            </div>
          )}
        </form>
      </dialog>

      <dialog id="my_modal_2" className="modal">
        {!selected ? (
          "No Selected Contact"
        ) : (
          <>
            <div className="modal-box text-center">
              <h3 className="font-bold text-2xl">{selected.phoneNumber}</h3>
              <p className="py-4">
                {selected.firstName} {selected.lastName}
              </p>
              <p>{formatDate(selected.createdAt)}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </>
        )}
      </dialog>

      <div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-2">
          <div className="card bg-base-100 p-6">
            <p className="mb-4">Your Contacts</p>
            <h3 className="text-4xl font-bold mb-10">20000</h3>
            <div className="flex justify-between items-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => (window as any).my_modal_5.showModal()}
              >
                New Contact
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex gap-4 md:flex-row lg:flex-col xl:flex-row card bg-base-100 p-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 7.33325C17.2377 7.33325 18.4247 7.82492 19.2998 8.70009C20.175 9.57526 20.6667 10.7622 20.6667 11.9999C20.6667 13.2376 20.175 14.4246 19.2998 15.2998C18.4247 16.1749 17.2377 16.6666 16 16.6666C14.7623 16.6666 13.5753 16.1749 12.7002 15.2998C11.825 14.4246 11.3333 13.2376 11.3333 11.9999C11.3333 10.7622 11.825 9.57526 12.7002 8.70009C13.5753 7.82492 14.7623 7.33325 16 7.33325ZM6.66667 10.6666C7.41333 10.6666 8.10667 10.8666 8.70667 11.2266C8.50667 13.1333 9.06667 15.0266 10.2133 16.5066C9.54667 17.7866 8.21333 18.6666 6.66667 18.6666C5.6058 18.6666 4.58839 18.2452 3.83824 17.495C3.08809 16.7449 2.66667 15.7275 2.66667 14.6666C2.66667 13.6057 3.08809 12.5883 3.83824 11.8382C4.58839 11.088 5.6058 10.6666 6.66667 10.6666ZM25.3333 10.6666C26.3942 10.6666 27.4116 11.088 28.1618 11.8382C28.9119 12.5883 29.3333 13.6057 29.3333 14.6666C29.3333 15.7275 28.9119 16.7449 28.1618 17.495C27.4116 18.2452 26.3942 18.6666 25.3333 18.6666C23.7867 18.6666 22.4533 17.7866 21.7867 16.5066C22.9492 15.0058 23.4888 13.1148 23.2933 11.2266C23.8933 10.8666 24.5867 10.6666 25.3333 10.6666ZM7.33333 24.3333C7.33333 21.5733 11.2133 19.3333 16 19.3333C20.7867 19.3333 24.6667 21.5733 24.6667 24.3333V26.6666H7.33333V24.3333ZM0 26.6666V24.6666C0 22.8133 2.52 21.2533 5.93333 20.7999C5.14667 21.7066 4.66667 22.9599 4.66667 24.3333V26.6666H0ZM32 26.6666H27.3333V24.3333C27.3333 22.9599 26.8533 21.7066 26.0667 20.7999C29.48 21.2533 32 22.8133 32 24.6666V26.6666Z"
                    fill="#4169E1"
                  />
                </svg>
              </div>

              <div>
                <p> All Contacts</p>
                <h2 className="text-xl">200</h2>
              </div>
            </div>
            <div className="flex gap-4 md:flex-row lg:flex-col xl:flex-row card bg-base-100 p-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M20.125 20.375C16.2869 20.375 8.625 22.2869 8.625 26.125V29H31.625V26.125C31.625 22.2869 23.9631 20.375 20.125 20.375ZM7.1875 14.625V10.3125H4.3125V14.625H0V17.5H4.3125V21.8125H7.1875V17.5H11.5V14.625M20.125 17.5C21.65 17.5 23.1125 16.8942 24.1909 15.8159C25.2692 14.7375 25.875 13.275 25.875 11.75C25.875 10.225 25.2692 8.76247 24.1909 7.68414C23.1125 6.6058 21.65 6 20.125 6C18.6 6 17.1375 6.6058 16.0591 7.68414C14.9808 8.76247 14.375 10.225 14.375 11.75C14.375 13.275 14.9808 14.7375 16.0591 15.8159C17.1375 16.8942 18.6 17.5 20.125 17.5Z"
                    fill="#439258"
                  />
                </svg>
              </div>

              <div>
                <p>New contacts</p>
                <h2 className="text-xl">5</h2>
              </div>
            </div>
            <div className="flex gap-4 md:flex-row lg:flex-col xl:flex-row card bg-base-100 p-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M29.3333 12.6667V11.3333C29.3333 10.6 28.7333 10 28 10C27.2667 10 26.6667 10.6 26.6667 11.3333V12.6667H25.3333C24.6 12.6667 24 13.2667 24 14C24 14.7333 24.6 15.3333 25.3333 15.3333H26.6667V16.6667C26.6667 17.4 27.2667 18 28 18C28.7333 18 29.3333 17.4 29.3333 16.6667V15.3333H30.6667C31.4 15.3333 32 14.7333 32 14C32 13.2667 31.4 12.6667 30.6667 12.6667H29.3333ZM10.6667 16.6667C13.6133 16.6667 16 14.28 16 11.3333C16 8.38667 13.6133 6 10.6667 6C7.72 6 5.33333 8.38667 5.33333 11.3333C5.33333 14.28 7.72 16.6667 10.6667 16.6667ZM10.6667 18C7.10667 18 0 19.7867 0 23.3333V27.3333H21.3333V23.3333C21.3333 19.7867 14.2267 18 10.6667 18ZM16.68 6.06667C17.9067 7.48 18.6667 9.32 18.6667 11.3333C18.6667 13.3467 17.9067 15.1867 16.68 16.6C19.2933 16.2667 21.3333 14.0533 21.3333 11.3333C21.3333 8.61333 19.2933 6.4 16.68 6.06667ZM22.04 19.1067C23.2267 20.2133 24 21.6 24 23.3333V27.3333H26.6667V23.3333C26.6667 21.4 24.5467 19.9867 22.04 19.1067Z"
                    fill="#b039c0"
                  />
                </svg>
              </div>

              <div>
                <p>Deleted Contact</p>
                <h2 className="text-xl">15</h2>
              </div>
            </div>
            <div className="flex gap-4 md:flex-row lg:flex-col xl:flex-row card bg-base-100 p-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_703_3116)">
                    <path
                      d="M22.925 16.55C25.202 16.55 27.0335 14.702 27.0335 12.425C27.0335 10.148 25.202 8.3 22.925 8.3C21.831 8.3 20.7818 8.7346 20.0082 9.50818C19.2346 10.2818 18.8 11.331 18.8 12.425C18.8 13.519 19.2346 14.5682 20.0082 15.3418C20.7818 16.1154 21.831 16.55 22.925 16.55ZM10.55 14.9C13.289 14.9 15.4835 12.689 15.4835 9.95C15.4835 7.211 13.289 5 10.55 5C7.811 5 5.6 7.211 5.6 9.95C5.6 12.689 7.811 14.9 10.55 14.9ZM22.925 19.85C19.9055 19.85 13.85 21.368 13.85 24.3875V28.1H32V24.3875C32 21.368 25.9445 19.85 22.925 19.85ZM10.55 18.2C6.7055 18.2 -1 20.1305 -1 23.975V28.1H10.55V24.3875C10.55 22.985 11.0945 20.5265 14.4605 18.662C13.025 18.365 11.639 18.2 10.55 18.2Z"
                      fill="#dbb623"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_703_3116">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div>
                <p>Blocked Contacts</p>
                <h2 className="text-xl">95</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-100 mt-6 rounded-lg p-7">
          {gettingContact ? (
            "Loading...."
          ) : (
            <ul className="">
              {data?.contacts?.map((contact) => {
                return (
                  <li
                    className="md:flex justify-between bg-base-200 rounded-md p-3 mb-2"
                    id={contact.phoneNumber}
                  >
                    <p>{contact.firstName}</p>
                    <p>{contact.lastName}</p>
                    <p>{contact.phoneNumber}</p>
                    {/* <p>{contact.createdAt}</p> */}
                    {/* RiEyeFill,RiPencilLine, RiDeleteBin2Line */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelected(contact);
                          (window as any).my_modal_2.showModal();
                        }}
                        className=" btn btn-ghost"
                      >
                        <RiEyeFill />
                      </button>
                      <button
                        onClick={() => setEditModal(contact)}
                        className=" btn btn-ghost"
                      >
                        <RiPencilLine />
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => deleteMut.mutate(contact.id)}
                      >
                        <RiDeleteBin2Line />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
