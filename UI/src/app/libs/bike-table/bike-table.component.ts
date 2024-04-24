import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Observable, map, shareReplay } from 'rxjs';
import { availabilityMapping, Bike, BikeSummary } from '../bike.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BikeDetailsComponent } from '../bike-details/bike-details.component';

export interface DialogData {
  bike?: Bike;
  edit: boolean;
}

@Component({
  selector: 'app-bike-table',
  templateUrl: './bike-table.component.html',
  styleUrl: './bike-table.component.scss'
})
export class BikeTableComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: Observable<MatTableDataSource<Bike>>;
  displayedColumns = [
    'name',
    'description',
    'price',
    'stock',
    'availability',
    'menu',
  ];

  constructor(
    private bikeService: BikeService,
    public dialog: MatDialog
  ) {
    this.initializeDataSource();
  };

  initializeDataSource(): void {
    this.dataSource = this.bikeService.getAll().pipe(
      map((formattedBikes) => {
        let dataSource = new MatTableDataSource(formattedBikes);
        return dataSource
        }
      ),
      shareReplay(),
    )
  };

  ngAfterViewInit() {
    this.dataSource.subscribe((dataSource) => dataSource.paginator = this.paginator);
  }

  getDescription(desc: string): string {
      return desc.length > 50 ? desc.slice(0,50) + '...' : desc;
  }

  getAvailability(id: number | string): string {
    return availabilityMapping[id as number] ?? "unknown";
  };

  openCreateModal(bike?: Bike) : void {
    const data = bike ? {bike: bike, edit: true} : {edit: false};
    const dialogRef = this.dialog.open(BikeDetailsComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.initializeDataSource();
    })
  };

  deleteBike(id: string): void {
    this.bikeService.delete(id).subscribe((res) => {
      this.initializeDataSource();
    });
  };
}



