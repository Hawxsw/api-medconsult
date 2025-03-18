import { Injectable } from '@nestjs/common';
import { DefaultPaginationDto } from '../dto/default-pagination.dto';

interface PageParams {
  take: number;
  skip: number;
}

@Injectable()
export class PaginationService {
  getPageParams(queries: DefaultPaginationDto): PageParams {
    const pageSize = Number(queries.pageSize);
    const page = Number(queries.page);

    return {
      take: pageSize,
      skip: pageSize * page - pageSize,
    };
  }
}
