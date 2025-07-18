
interface PageHeaderProps {
  title: string;
  userFullName?: string;
}

export default function PageHeader({ title, userFullName = '{TuNombre}' }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <span className="text-gray-600">{userFullName}</span>
    </div>
  );
}
