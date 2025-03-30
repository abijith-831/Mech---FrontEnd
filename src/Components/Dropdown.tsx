import { Button } from "../../@/components/ui/button";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { useSnackbar } from 'notistack'


type Widget = { id: number; name: string; visible: boolean };
type Props = {
  widgets: Widget[];
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>;
};

const Dropdown: React.FC<Props> = ({ widgets, setWidgets }) => {
  const { enqueueSnackbar } = useSnackbar()

  
  const handleCheckboxChange = async (id: number, visible: boolean) => {
    try {
      setWidgets((prev) =>
        prev.map((widget) => (widget.id === id ? { ...widget, visible: !widget.visible } : widget))
      );

      await axios.put(`http://localhost:5000/widget/${id}`, { visible: !visible });
      console.log('sdfs',widgets[id-1]);
      
      console.log(`Widget ${widgets[id-1].name} updated successfullyfgdgdgdf`);
      enqueueSnackbar(`Widget ${widgets[id-1].name} ${widgets[id-1].visible?'Hided':'Showing'}!`, { 
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" }, 
      });
    } catch (error: any) {
      console.error("Error updating widget:", error.response?.data || error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-white cursor-pointer py-2 px-4 transition duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white hover:scale-105"
        >
          Widgets
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="absolute right-0 min-w-[12rem] bg-gray-400 text-black p-2 rounded-md z-50 shadow-lg"
      >
        <DropdownMenuSeparator />
        {widgets.map((widget) => (
          <DropdownMenuItem
            key={widget.id}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-500 rounded-md"
          >
            <input
              type="checkbox"
              checked={widget.visible}
              onChange={() => handleCheckboxChange(widget.id, widget.visible)}
              className="form-checkbox text-green-500 focus:ring-0 focus:ring-offset-0"
            />
            {widget.name.charAt(0).toUpperCase() + widget.name.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
