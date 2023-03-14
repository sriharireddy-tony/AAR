import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { Services } from '../services/services';

@Component({
	selector: 'app-master-data',
	templateUrl: './master-data.component.html',
	styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {
	[x: string]: any;


	aarSoftTrimsDetailsList: any = [];
	tuple: any;
	new_ary: any = [];
	row: number = 0;
	ele: any;
	selectedfile: any;
	AARST_REF_NO: any;
	isSelected: any;
	allSelected: any;
	hiddenvalue: boolean = true;
	pselected: any;
	pallselected: any;
	cdmmCheckedRows: any;
	MIC_ary: any;
	AAR_SYSTEM_REF_NO: any;


	constructor(private services: Services, private commonservice: CommonService, private datepipe: DatePipe) {

	}
	tName: string = 'PMaster';
	ngOnInit(): void {
		this.getAArSoftTrimDetails();
		this.GetAARDecorativeFinishDetails();
		this.getpmasterdetails();
		this.GetSmasterdetails();
		this.GetPMICdetails();
	}

	saveAAR() {
		this.getpmasterdetails();
		switch (this.tName) {
			case 'PMaster':
				this.Savepmasterdetails();
				break;
			case 'SCreator':

				break;
		}
	}

	projectMasterList: any = [];
	Addpmasterdetails(): void {
		return this.projectMasterList.push({
			'AAR_MASTER_REF_NO': '', 'AAR_SECTOR': '', 'AAR_PLATFORM': '',
			'AAR_PROJECT_NAME': '', 'AAR_PROJECT_CODE': '',
		});
	}
	getpmasterdetails() {
		const param = "";
		this.services.invokeService("GetAARProjectMasterDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false)
			.then((res: any) => {
				this.projectMasterList = res;
			})
	}
	AAR_MASTER_REF_NO: string = '';
	Savepmasterdetails() {
		let paramTuple: {}[] = [];
		var params = {};
		for (var ele of this.projectMasterList) {
			if (this.datavalidate(ele.AAR_MASTER_REF_NO) == '') {
				params = {
					new: {
						AAR_PROJECT_MASTER: {
							'AAR_MASTER_REF_NO': "",
							'AAR_SECTOR': ele.AAR_SECTOR,
							'AAR_PLATFORM': ele.AAR_PLATFORM,
							'AAR_PROJECT_NAME': ele.AAR_PROJECT_NAME,
							'AAR_PROJECT_CODE': ele.AAR_PROJECT_CODE,
						}
					}
				}
			}
			else {
				params = {
					old: {
						AAR_PROJECT_MASTER: {
							AAR_MASTER_REF_NO: ele.AAR_MASTER_REF_NO
						}
					},
					new: {
						AAR_PROJECT_MASTER: {
							'AAR_MASTER_REF_NO': ele.AAR_MASTER_REF_NO,
							'AAR_SECTOR': ele.AAR_SECTOR,
							'AAR_PLATFORM': ele.AAR_PLATFORM,
							'AAR_PROJECT_NAME': ele.AAR_PROJECT_NAME,
							'AAR_PROJECT_CODE': ele.AAR_PROJECT_CODE,
						}
					}
				}
			}
			paramTuple.push(params)
		}
		var paramsAll = { 'tuple': paramTuple }
		this.services.invokeService("UpdateAarProjectMaster", paramsAll, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
			.then((res: any) => {
				//    this.AAR_MASTER_REF_NO = res[0].AAR_MASTER_REF_NO;
				this.projectMasterList = res;
				Swal.fire("Data saved successfully");
				console.log(res);
			})
	}
	Deletepmasterdetails(arg: any) {
		if (this.datavalidate(arg.AAR_MASTER_REF_NO) != '') {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					let dataobj = {
						tuple: {
							old: {
								AAR_PROJECT_MASTER: {
									'AAR_MASTER_REF_NO': arg.AAR_MASTER_REF_NO
								}
							}
						}
					}
					this.services.invokeService("UpdateAarProjectMaster", dataobj, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
						.then((res: any) => {
							this.getpmasterdetails();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
						})
				}
			});
		}
		else {
			return this.projectMasterList.splice(this.projectMasterList.indexOf(arg), 1)
		}
	}

	sMasterList: any = [];
	AddSmasterdetails() {
		return this.sMasterList.push({ 'AAR_SYSTEM_REF_NO': '', 'AAR_SYSTEM': "", 'AAR_SYSTEM_CODE': "" });
	}

	SaveSmasterdetails() {
		let paramTuple: {}[] = [];
		var params = {};
		for (var ele of this.sMasterList) {
			if (this.datavalidate(ele.AAR_SYSTEM_REF_NO) == '') {
				params = {
					new: {
						AAR_SYSTEM_DETAILS: {
							'AAR_SYSTEM_REF_NO': "",
							'AAR_SYSTEM': ele.AAR_SYSTEM,
							'AAR_SYSTEM_CODE': ele.AAR_SYSTEM_CODE
						}
					}
				}
			}
			else {
				params = {
					old: {
						AAR_SYSTEM_DETAILS: {
							AAR_SYSTEM_REF_NO: ele.AAR_SYSTEM_REF_NO
						}
					},
					new: {
						AAR_SYSTEM_DETAILS: {
							'AAR_SYSTEM_REF_NO': ele.AAR_SYSTEM_REF_NO,
							'AAR_SYSTEM': ele.AAR_SYSTEM,
							'AAR_SYSTEM_CODE': ele.AAR_SYSTEM_CODE
						}
					}
				}
			}
			paramTuple.push(params)
		}
		var paramsAll = { 'tuple': paramTuple }
		this.services.invokeService("UpdateAarSystemDetails", paramsAll, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
			.then((res: any) => {
				this.AAR_SYSTEM_REF_NO = res[0].AAR_SYSTEM_REF_NO;
				this.sMasterList = res;
				Swal.fire('Data saved successfully');
			})
	}

	GetSmasterdetails() {
		const param = "";
		this.services.invokeService("GetAARSystemDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false)
			.then((res: any) => {
				this.sMasterList = res;
			})
	}
	DeleteSmasterdetails(x: any) {
		if (this.datavalidate(x.AAR_SYSTEM_REF_NO) != '') {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					let dataobj = {
						tuple: {
							old: {
								AAR_SYSTEM_DETAILS: {
									'AAR_SYSTEM_REF_NO': x.AAR_SYSTEM_REF_NO
								}
							}
						}
					}
					this.services.invokeService("UpdateAarSystemDetails", dataobj, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
						.then((res: any) => {
							this.GetSmasterdetails();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
						})
				}
			});
		}
		else {
			return this.sMasterList.splice(this.sMasterList.indexOf(x), 1);
		}
	}

	plasticMICdetailslist: any = [];
	addpmicdetails() {
		return this.plasticMICdetailslist.push({
			'AARPM_REF_NO': "",
			'AARPM_COLOR_NAME': "",
			'AARPM_COLOR_CODE': "",
			'AARPM_MATERIAL_GRADE': "",
			'AARPM_FINISH_TYPE': "",
			'AARPM_MASTER_DATE': "",
			'AARPM_APPLICABLE_PART': "",
			'AARPM_SUPPLIER': "",
			'AARPM_L_COLOR': "",
			'AARPM_A_COLOR': "",
			'AARPM_B_COLOR': "",
			'AARPM_GLOSS_GRAMS': "",
			'AARPM_DESIGNER': "",
			'AARPM_CREATEDBY': "",
			'AARPM_PROJECT': "",
			'AARPM_IMAGENAME': "",
			'AARPM_IMAGEPATH': "",
			'AARPM_CREATED_ON': "",
			'AARPM_COMPLETED_ON': ""
		})
	};
	savepmicdetails() {
		let paramTuple: {}[] = [];
		var params = {};
		for (var ele of this.plasticMICdetailslist) {
			if (this.datavalidate(ele.AARPM_REF_NO) == '') {
				params = {
					new: {
						AAR_PLASTIC_MIS_DETAILS: {
							'AARPM_REF_NO': "",
							'AARPM_COLOR_NAME': ele.AARPM_COLOR_NAME,
							'AARPM_COLOR_CODE': ele.AARPM_COLOR_CODE,
							'AARPM_MATERIAL_GRADE': ele.AARPM_MATERIAL_GRADE,
							'AARPM_FINISH_TYPE': ele.AARPM_FINISH_TYPE,
							'AARPM_MASTER_DATE': this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
							'AARPM_APPLICABLE_PART': ele.AARPM_APPLICABLE_PART,
							'AARPM_SUPPLIER': ele.AARPM_SUPPLIER,
							'AARPM_L_COLOR': ele.AARPM_L_COLOR,
							'AARPM_A_COLOR': ele.AARPM_A_COLOR,
							'AARPM_B_COLOR': ele.AARPM_B_COLOR,
							'AARPM_GLOSS_GRAMS': ele.AARPM_GLOSS_GRAMS,
							'AARPM_DESIGNER': ele.AARPM_DESIGNER,
							'AARPM_CREATEDBY': ele.AARPM_CREATEDBY,
							'AARPM_PROJECT': ele.AARPM_PROJECT,
							'AARPM_IMAGENAME': ele.AARPM_IMAGENAME,
							'AARPM_IMAGEPATH': ele.AARPM_IMAGENAME,
							'AARPM_CREATED_ON': ele.AARPM_MASTER_DATE,
							'AARPM_COMPLETED_ON': ele.AARPM_MASTER_DATE
						}
					}
				}
			}
			else {
				params = {
					old: {
						AAR_PLASTIC_MIS_DETAILS: {
							AARPM_REF_NO: ele.AARPM_REF_NO
						}
					},
					new: {
						AAR_PLASTIC_MIS_DETAILS: {
							'AARPM_COLOR_NAME': ele.AARPM_COLOR_NAME,
							'AARPM_COLOR_CODE': ele.AARPM_COLOR_CODE,
							'AARPM_MATERIAL_GRADE': ele.AARPM_MATERIAL_GRADE,
							'AARPM_FINISH_TYPE': ele.AARPM_FINISH_TYPE,
							'AARPM_MASTER_DATE': this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
							'AARPM_APPLICABLE_PART': ele.AARPM_APPLICABLE_PART,
							'AARPM_SUPPLIER': ele.AARPM_SUPPLIER,
							'AARPM_L_COLOR': ele.AARPM_L_COLOR,
							'AARPM_A_COLOR': ele.AARPM_A_COLOR,
							'AARPM_B_COLOR': ele.AARPM_B_COLOR,
							'AARPM_GLOSS_GRAMS': ele.AARPM_GLOSS_GRAMS,
							'AARPM_DESIGNER': ele.AARPM_DESIGNER,
							'AARPM_CREATEDBY': ele.AARPM_CREATEDBY,
							'AARPM_PROJECT': ele.AARPM_PROJECT,
							'AARPM_IMAGENAME': ele.AARPM_IMAGENAME,
							'AARPM_IMAGEPATH': ele.AARPM_IMAGENAME,
							'AARPM_CREATED_ON': ele.AARPM_MASTER_DATE,
							'AARPM_COMPLETED_ON': ele.AARPM_MASTER_DATE
						}
					}
				}
			}
			paramTuple.push(params)
		}
		var paramsAll = { 'tuple': paramTuple }
		this.services.invokeService("UpdateAarPlasticMisDetails", paramsAll, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
			.then((res: any) => {
				this.plasticMICdetailslist = res;
				Swal.fire('Data saved successfully');
				console.log("res", res);
			})
	}

	GetPMICdetails() {
		const param = "";
		this.services.invokeService("GetAARPlasticMISDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false)
			.then((res: any) => {
				this.plasticMICdetailslist = res;
			})
	}
	deleteplasticMICdetails(y: any) {
		if (this.datavalidate(y.AARPM_REF_NO) != '') {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					let dataobj = {
						tuple: {
							old: {
								AAR_PLASTIC_MIS_DETAILS: {
									'AARPM_REF_NO': y.AARPM_REF_NO
								}
							}
						}
					}
					this.services.invokeService("UpdateAarPlasticMisDetails", dataobj, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
						.then((res: any) => {
							this.GetPMICdetails();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
						})
				}
			});
		}
		else {
			return this.plasticMICdetailslist.splice(this.plasticMICdetailslist.indexOf(y), 1);
		}
	}

	getAArSoftTrimDetails() {
		const param = "";
		this.services.invokeService("GetAARSoftTrimDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).then((res: any) => {
			this.aarSoftTrimsDetailsList = res;
		})
	}

	add(): void {
		return this.aarSoftTrimsDetailsList.push({
			'AARST_REF_NO': "",
			"AARST_COLOR_NAME": " ",
			"AARST_COLOR_CODE": '',
			"AARST_MAT_SPECI": '',
			"AARST_MAT_CON": '',
			"AARST_TREAT": '',
			"AARST_LAMI_THICK": '',
			"AARST_APP_AREA": '',
			"AARST_STRETCH_WRAP": '',
			"AARST_MAT_DATE": '',
			"AARST_SUPPLIER": '',
			"AARST_DESIGNER": '',
			"AARST_COST": '',
			"AARST_CREATED_BY": '',
			"AARST_PROJECT": '',
			"AARST_UPLOAD_IMAGE": '',
		});
	}
	RefNumber: any = "";

	Savesofttrimdetails() {
		let paramTuple: {}[] = [];
		var params = {};
		for (var ele of this.aarSoftTrimsDetailsList) {
			if (this.datavalidate(ele.AARST_REF_NO) == '') {
				params = {
					new: {
						AAR_SOFT_TRIM_DETAILS: {
							'AARST_REF_NO': "",
							'AARST_COLOR_NAME': ele.AARST_COLOR_NAME,
							'AARST_COLOR_CODE': ele.AARST_COLOR_CODE,
							'AARST_MAT_SPECI': ele.AARST_MAT_SPECI,
							'AARST_MAT_CON': ele.AARST_MAT_CON,
							'AARST_TREAT': ele.AARST_TREAT,
							'AARST_LAMI_THICK': ele.AARST_LAMI_THICK,
							'AARST_APP_AREA': ele.AARST_APP_AREA,
							'AARST_STRETCH_WRAP': ele.AARST_STRETCH_WRAP,
							'AARST_MAT_DATE': ele.AARST_MAT_DATE,
							'AARST_SUPPLIER': ele.AARST_SUPPLIER,
							'AARST_DESIGNER': ele.AARST_DESIGNER,
							'AARST_COST': ele.AARST_COST,
							'AARST_PROJECT': ele.AARST_PROJECT,
							'AARST_CREATED_BY': ele.AARST_CREATED_BY,
							'AARST_UPLOAD_IMAGE': ele.AARST_UPLOAD_IMAGE,
							'AARST_UPLOAD_IMAGE_PATH': ele.AARST_UPLOAD_IMAGE,
							'AARST_CREATED_ON': ele.AARST_MAT_DATE
						}
					}
				}
			}
			else {
				params = {
					old: {
						AAR_SOFT_TRIM_DETAILS: {
							AARST_REF_NO: ele.AARST_REF_NO
						}
					},
					new: {
						AAR_SOFT_TRIM_DETAILS: {
							'AARST_COLOR_NAME': ele.AARST_COLOR_NAME,
							'AARST_COLOR_CODE': ele.AARST_COLOR_CODE,
							'AARST_MAT_SPECI': ele.AARST_MAT_SPECI,
							'AARST_MAT_CON': ele.AARST_MAT_CON,
							'AARST_TREAT': ele.AARST_TREAT,
							'AARST_LAMI_THICK': ele.AARST_LAMI_THICK,
							'AARST_APP_AREA': ele.AARST_APP_AREA,
							'AARST_STRETCH_WRAP': ele.AARST_STRETCH_WRAP,
							'AARST_MAT_DATE': ele.AARST_MAT_DATE,
							'AARST_SUPPLIER': ele.AARST_SUPPLIER,
							'AARST_DESIGNER': ele.AARST_DESIGNER,
							'AARST_COST': ele.AARST_COST,
							'AARST_PROJECT': ele.AARST_PROJECT,
							'AARST_CREATED_BY': ele.AARST_CREATED_BY,
							'AARST_UPLOAD_IMAGE': ele.AARST_UPLOAD_IMAGE,
							'AARST_UPLOAD_IMAGE_PATH': ele.AARST_UPLOAD_IMAGE,
							'AARST_CREATED_ON': ele.AARST_MAT_DATE
						}
					}
				}
			}
			paramTuple.push(params)
		}
		var paramsAll = { 'tuple': paramTuple }
		this.services.invokeService("UpdateAarSoftTrimDetails", paramsAll, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
			.then((res: any) => {
				this.aarSoftTrimsDetailsList = res;
				Swal.fire('Saved!', '', 'success')
			})
	}
	;
	DeleteSofttrimdetails(item: any) {
		if (this.datavalidate(item.AARST_REF_NO) != '') {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					let dataobj = {
						tuple: {
							old: {
								AAR_SOFT_TRIM_DETAILS: {
									'AARST_REF_NO': item.AARST_REF_NO
								}
							}
						}
					}
					this.services.invokeService("UpdateAarSoftTrimDetails", dataobj, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
						.then((res: any) => {
							this.getAArSoftTrimDetails();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
						})
				}
			});
		}
		else {
			return this.aarSoftTrimsDetailsList.splice(this.aarSoftTrimsDetailsList.indexOf(item), 1);
		}
	}

	tabClick(type: string) {
		this.tName = type;
	}

	date: Date | undefined;


	onFileChanged(event: any) {
		this.selectedfile = event.target.files[0];
		//  console.log(this.selectedfile);
	}

	GetAARDecorativeFinishDetails() {
		const param = "";
		this.services.invokeService("GetAARDecorativeFinishDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false)
			.then((res: any) => {
				this.dfinishList = res;
			})
	}
	dfinishList: any = [];
	addList() {
		return this.dfinishList.push({
			'AARDF_REF_NO': '',
			'AARDF_FINISH_CODE': '',
			'AARDF_FINISH_TYPE': '',
			'AADRF_TIER2_SUPP': '',
			'AARDF_TIER1_SUPP': '',
			'AARDF_APP_LOC': '',
			'AARDF_SCRATCH': '',
			'AARDF_PROCESS_LOC': '',
			'AARDF_DATE': '',
			'AARDF_GLOSS': '',
			'AARDF_DESIGNER': '',
			'AARDF_CREATED_BY': '',
			'AARDF_PROJECT': '',
			'AARDF_UPLOAD_IMAGE': ''
		})
	};

	SaveDFinishListItems() {
		let paramTuple: {}[] = [];
		var params = {};
		for (var item of this.dfinishList) {
			if (this.datavalidate(item.AARDF_REF_NO) == '') {
				params = {
					new: {
						AAR_DECORATIVE_FINISH_DETAILS: {
							'AARDF_REF_NO': "",
							'AARDF_FINISH_CODE': item.AARDF_FINISH_CODE,
							'AARDF_FINISH_TYPE': item.AARDF_FINISH_TYPE,
							'AADRF_TIER2_SUPP': item.AADRF_TIER2_SUPP,
							'AARDF_TIER1_SUPP': item.AARDF_TIER1_SUPP,
							'AARDF_APP_LOC': item.AARDF_APP_LOC,
							'AARDF_SCRATCH': item.AARDF_SCRATCH,
							'AARDF_PROCESS_LOC': item.AARDF_PROCESS_LOC,
							//   'AARDF_DATE' : item.AARDF_DATE,
							'AARDF_GLOSS': item.AARDF_GLOSS,
							'AARDF_DESIGNER': item.AARDF_DESIGNER,
							'AARDF_CREATED_BY': item.AARDF_CREATED_BY,
							//   'AARDF_CREATED_ON' : item.AARDF_DATE,
							'AARDF_PROJECT': item.AARDF_PROJECT,
							'AARDF_UPLOAD_IMAGE': item.AARDF_UPLOAD_IMAGE,
							'AARDF_UPLOAD_PATH': item.AARDF_UPLOAD_IMAGE
						}
					}
				}
			}
			else {
				params = {
					old: {
						AAR_DECORATIVE_FINISH_DETAILS: {
							AARDF_REF_NO: item.AARDF_REF_NO
						}
					},
					new: {
						AAR_DECORATIVE_FINISH_DETAILS: {
							'AARDF_FINISH_CODE': item.AARDF_FINISH_CODE,
							'AARDF_FINISH_TYPE': item.AARDF_FINISH_TYPE,
							'AADRF_TIER2_SUPP': item.AADRF_TIER2_SUPP,
							'AARDF_TIER1_SUPP': item.AARDF_TIER1_SUPP,
							'AARDF_APP_LOC': item.AARDF_APP_LOC,
							'AARDF_SCRATCH': item.AARDF_SCRATCH,
							'AARDF_PROCESS_LOC': item.AARDF_PROCESS_LOC,
							//   'AARDF_DATE' : item.AARDF_DATE,
							'AARDF_GLOSS': item.AARDF_GLOSS,
							'AARDF_DESIGNER': item.AARDF_DESIGNER,
							'AARDF_CREATED_BY': item.AARDF_CREATED_BY,
							//   'AARDF_CREATED_ON' : item.AARDF_DATE,
							'AARDF_PROJECT': item.AARDF_PROJECT,
							'AARDF_UPLOAD_IMAGE': item.AARDF_UPLOAD_IMAGE,
							'AARDF_UPLOAD_PATH': item.AARDF_UPLOAD_IMAGE
						}
					}
				}
			}
			paramTuple.push(params)
		}
		var paramsAll = { 'tuple': paramTuple }
		this.services.invokeService("UpdateAarDecorativeFinishDetails", paramsAll, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
			.then((res: any) => {
				this.dfinishList = res;
				Swal.fire("Data saved successfully");
			})
	}
	DeleteFinishListItems(i: any) {
		if (this.datavalidate(i.AARDF_REF_NO) != '') {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					let dataobj = {
						tuple: {
							old: {
								AAR_DECORATIVE_FINISH_DETAILS: {
									'AARDF_REF_NO': i.AARDF_REF_NO
								}
							}
						}
					}
					this.services.invokeService("UpdateAarDecorativeFinishDetails", dataobj, "http://schemas.cordys.com/AARWSAppServerPackage", true, false)
						.then((res: any) => {
							this.GetAARDecorativeFinishDetails();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
						})
				}
			});
		}
		else {
			return this.dfinishList.splice(this.dfinishList.indexOf(i), 1);

		}
	}

	datavalidate(data: string | null | undefined) {
		//debugger;
		if (data != undefined && data != null && data != "") {
			return data;
		} else {
			return "";
		}
	}
}

function tabClick(type: any, string: any) {
	throw new Error('Function not implemented.');
}

