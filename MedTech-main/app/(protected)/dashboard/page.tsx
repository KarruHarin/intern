import { auth } from "@/auth";
import { MainCarausel } from "@/components/dashboard/carausel";
import NearbyDoctors from "@/components/dashboard/nearby-doctors";
import RecommendedDoctors from "@/components/dashboard/recommended-doctor";
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments";
import CalenderAndAppointments from "@/components/doctor-dashboard/doc-calender";
import { DocCarausel } from "@/components/doctor-dashboard/doc-Carausel";
import PatientList from "@/components/doctor-dashboard/doc-patientList";

const Settings = async () => {
  const session = await auth();
  const id = session?.user.id||'';
  const role = session?.user.role;

  return (
    <div className="p-3 grid gap-4 grid-cols-6">

      {role&&role === "USER" ? <User id={id} /> : <Doctor id={id} />}
    </div>
  );
};

export default Settings;

const User = ({ id }: any) => {
  return (
    <>
      <div className=" col-span-6 lg:col-span-4">
        <MainCarausel />
        <NearbyDoctors />
      </div>
      <UpcomingAppointments id={id} />
      <RecommendedDoctors />
    </>
  );
};

const Doctor = ({ id }: any) => {
  return (
    <>
      <div className=" col-span-6 lg:col-span-4">
        <DocCarausel />
        <PatientList />
      </div>
      <CalenderAndAppointments />
    </>
  );
};

