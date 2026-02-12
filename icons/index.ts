export type { IconColor, IconProps, IconSize } from "./Icon.types";

import { AccountCircle } from "./AccountCircle";
import { Add } from "./Add";
import { ArrowBack } from "./ArrowBack";
import { ArrowDropDown } from "./ArrowDropDown";
import { ArrowDropUp } from "./ArrowDropUp";
import { ArrowForward } from "./ArrowForward";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { Attachment } from "./Attachment";
import { Chat } from "./Chat";
import { Check } from "./Check";
import { CheckCircle } from "./CheckCircle";
import { ChevronLeft } from "./ChevronLeft";
import { ChevronRight } from "./ChevronRight";
import { Close } from "./Close";
import { CodeBrackets } from "./CodeBrackets";
import { Comment } from "./Comment";
import { ContentCopy } from "./ContentCopy";
import { ContentPaste } from "./ContentPaste";
import { Delete } from "./Delete";
import { Description } from "./Description";
import { Download } from "./Download";
import { Edit } from "./Edit";
import { Email } from "./Email";
import { ErrorCircle } from "./ErrorCircle";
import { ExpandLess } from "./ExpandLess";
import { ExpandMore } from "./ExpandMore";
import { FilterList } from "./FilterList";
import { Folder } from "./Folder";
import { Help } from "./Help";
import { Info } from "./Info";
import { KeyboardArrowDown } from "./KeyboardArrowDown";
import { KeyboardArrowUp } from "./KeyboardArrowUp";
import { Logout } from "./Logout";
import { Menu } from "./Menu";
import { Notifications } from "./Notifications";
import { People } from "./People";
import { Person } from "./Person";
import { Refresh } from "./Refresh";
import { Remove } from "./Remove";
import { Save } from "./Save";
import { Search } from "./Search";
import { Settings } from "./Settings";
import { Share } from "./Share";
import { Sort } from "./Sort";
import { Upload } from "./Upload";
import { Visibility } from "./Visibility";
import { VisibilityOff } from "./VisibilityOff";
import { Warning } from "./Warning";

export {
	AccountCircle,
	Add,
	ArrowBack,
	ArrowDropDown,
	ArrowDropUp,
	ArrowForward,
	ArrowLeft,
	ArrowRight,
	Attachment,
	Chat,
	Check,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Close,
	CodeBrackets,
	Comment,
	ContentCopy,
	ContentPaste,
	Delete,
	Description,
	Download,
	Edit,
	Email,
	ErrorCircle,
	ExpandLess,
	ExpandMore,
	FilterList,
	Folder,
	Help,
	Info,
	KeyboardArrowDown,
	KeyboardArrowUp,
	Logout,
	Menu,
	Notifications,
	People,
	Person,
	Refresh,
	Remove,
	Save,
	Search,
	Settings,
	Share,
	Sort,
	Upload,
	Visibility,
	VisibilityOff,
	Warning,
};

export const iconMap: Record<
	string,
	React.ComponentType<import("./Icon.types").IconProps>
> = {
	AccountCircle: AccountCircle,
	Add: Add,
	ArrowBack: ArrowBack,
	ArrowDropDown: ArrowDropDown,
	ArrowDropUp: ArrowDropUp,
	ArrowForward: ArrowForward,
	ArrowLeft: ArrowLeft,
	ArrowRight: ArrowRight,
	Attachment: Attachment,
	Chat: Chat,
	Check: Check,
	CheckCircle: CheckCircle,
	ChevronLeft: ChevronLeft,
	ChevronRight: ChevronRight,
	Close: Close,
	CodeBrackets: CodeBrackets,
	Comment: Comment,
	ContentCopy: ContentCopy,
	ContentPaste: ContentPaste,
	Delete: Delete,
	Description: Description,
	Download: Download,
	Edit: Edit,
	Email: Email,
	ErrorCircle: ErrorCircle,
	ExpandLess: ExpandLess,
	ExpandMore: ExpandMore,
	FilterList: FilterList,
	Folder: Folder,
	Help: Help,
	Info: Info,
	KeyboardArrowDown: KeyboardArrowDown,
	KeyboardArrowUp: KeyboardArrowUp,
	Logout: Logout,
	Menu: Menu,
	Notifications: Notifications,
	People: People,
	Person: Person,
	Refresh: Refresh,
	Remove: Remove,
	Save: Save,
	Search: Search,
	Settings: Settings,
	Share: Share,
	Sort: Sort,
	Upload: Upload,
	Visibility: Visibility,
	VisibilityOff: VisibilityOff,
	Warning: Warning,
};
