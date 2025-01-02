import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetDemoProps {
  test_items: any ;
}

export function SheetDemo({ test_items }: SheetDemoProps) {
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="relative h-fit border-r-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center py-5"
          variant="outline"
        >
          <div className="line w-1 h-40 bg-[#00000288]"></div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Test Scope</SheetTitle>
          <SheetDescription>List of all</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            {test_items.topics && test_items.topics.length > 0 ? (
              test_items.topics.map((item: any) => {
                return (
                  <div key={item.id}>
                    <Label htmlFor="name" className="text-right">
                      Topic Name {item.name}
                    </Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Subtopic Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {item.subtopics.length > 0  
                            ? item.subtopics.map((subtopic: any, index: number) => {
                                return (
                                  <SelectItem key={index} value={subtopic.name}>
                                    {subtopic.name}s
                                  </SelectItem>
                                );
                              })
                            : ""}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                );
              })
            ) : (
              <p>No test items</p>
            )}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
