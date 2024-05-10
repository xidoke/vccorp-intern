import {
  Cell,
  Demo,
  Header,
  Position,
  Row,
  Type,
  Website,
} from '@prisma/client';

export type TypeIncludeHeaders = Type & { headers: Header[] };

export type PositionIncludeDemoList = Position & { demoList: Demo[] };

export type CellIncludeHeaders = Cell & { headers: Header[] };
export type RowIncludeAll = Row & {
  website: Website;
  position: PositionIncludeDemoList;
  cells: CellIncludeHeaders[];
};
