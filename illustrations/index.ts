export { Illustration } from "./Illustration";
export type {
	IllustrationCoreProps,
	IllustrationProps,
	IllustrationSize,
} from "./Illustration.types";

import { Achievement } from "./Achievement";
import { AddDimensions } from "./AddDimensions";
import { AddingColumns } from "./AddingColumns";
import { AddPeopleToCalendar } from "./AddPeopleToCalendar";
import { BeforeSearch } from "./BeforeSearch";
import { DragFilesToUpload } from "./DragFilesToUpload";
import { EmptyPlanningCalendar } from "./EmptyPlanningCalendar";
import { FilteringColumns } from "./FilteringColumns";
import { GroupingColumns } from "./GroupingColumns";
import { KeyTask } from "./KeyTask";
import { NewMail } from "./NewMail";
import { NoActivities } from "./NoActivities";
import { NoChartData } from "./NoChartData";
import { NoColumnsSet } from "./NoColumnsSet";
import { NoData } from "./NoData";
import { NoEntries } from "./NoEntries";
import { NoFilterResults } from "./NoFilterResults";
import { NoMail } from "./NoMail";
import { NoNotifications } from "./NoNotifications";
import { NoSavedItems } from "./NoSavedItems";
import { NoSearchResults } from "./NoSearchResults";
import { NoTasks } from "./NoTasks";
import { PageNotFound } from "./PageNotFound";
import { ReceiveAppreciation } from "./ReceiveAppreciation";
import { ResizingColumns } from "./ResizingColumns";
import { SignOut } from "./SignOut";
import { SortingColumns } from "./SortingColumns";
import { UnableToLoad } from "./UnableToLoad";
import { UnableToLoadImage } from "./UnableToLoadImage";
import { UnableToUpload } from "./UnableToUpload";
import { UploadToCloud } from "./UploadToCloud";
import { UserHasSignedUp } from "./UserHasSignedUp";

export {
	Achievement,
	AddDimensions,
	AddingColumns,
	AddPeopleToCalendar,
	BeforeSearch,
	DragFilesToUpload,
	EmptyPlanningCalendar,
	FilteringColumns,
	GroupingColumns,
	KeyTask,
	NewMail,
	NoActivities,
	NoChartData,
	NoColumnsSet,
	NoData,
	NoEntries,
	NoFilterResults,
	NoMail,
	NoNotifications,
	NoSavedItems,
	NoSearchResults,
	NoTasks,
	PageNotFound,
	ReceiveAppreciation,
	ResizingColumns,
	SignOut,
	SortingColumns,
	UnableToLoad,
	UnableToLoadImage,
	UnableToUpload,
	UploadToCloud,
	UserHasSignedUp,
};

export const illustrationMap: Record<
	string,
	React.ComponentType<import("./Illustration.types").IllustrationProps>
> = {
	Achievement: Achievement,
	AddDimensions: AddDimensions,
	AddingColumns: AddingColumns,
	AddPeopleToCalendar: AddPeopleToCalendar,
	BeforeSearch: BeforeSearch,
	DragFilesToUpload: DragFilesToUpload,
	EmptyPlanningCalendar: EmptyPlanningCalendar,
	FilteringColumns: FilteringColumns,
	GroupingColumns: GroupingColumns,
	KeyTask: KeyTask,
	NewMail: NewMail,
	NoActivities: NoActivities,
	NoChartData: NoChartData,
	NoColumnsSet: NoColumnsSet,
	NoData: NoData,
	NoEntries: NoEntries,
	NoFilterResults: NoFilterResults,
	NoMail: NoMail,
	NoNotifications: NoNotifications,
	NoSavedItems: NoSavedItems,
	NoSearchResults: NoSearchResults,
	NoTasks: NoTasks,
	PageNotFound: PageNotFound,
	ReceiveAppreciation: ReceiveAppreciation,
	ResizingColumns: ResizingColumns,
	SignOut: SignOut,
	SortingColumns: SortingColumns,
	UnableToLoad: UnableToLoad,
	UnableToLoadImage: UnableToLoadImage,
	UnableToUpload: UnableToUpload,
	UploadToCloud: UploadToCloud,
	UserHasSignedUp: UserHasSignedUp,
};
