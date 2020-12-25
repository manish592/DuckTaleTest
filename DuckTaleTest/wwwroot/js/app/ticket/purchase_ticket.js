var app = angular.module("ticket_purchase");
app.controller("TicketCtrl", function ($scope, $location, CategoryService) {
	$scope.title = "Booking Detail";
	$scope.Categories = [];
	$scope.Packages = [];
	$scope.Items = [];
	$scope.CategoryId;
	$scope.selectedTickets = [];
	$scope.selectedTicketItems = [];
	$scope.selectedPackageCategory = [];
	$scope.packageCategory;
	$scope.IsTicketSelected = $scope.selectedTickets.lenght !== 0;
	var d = new Date()
	var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	var todayTime = [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
	$scope.ph_numbr = /^\+?\d{10}$/;
	$scope.TicketVM = { firstName: "", visitDate: today, visitTime: "", timming: [] }
	$scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	$scope.Amount = 0
	$scope.IsValid = true
	$scope.SelectPackageId = false;
	$scope.TicketType = 'Package';
	$scope.Timming = [];
	$scope.Package = "";
	$scope.IsTicketValidate = false;
	$scope.PackageItemName = [];
	var selectedItems = [];



	var ticketItemDetail = function () {

		$scope.selectedTicketItems = [];
		selectedItems = [];
		var index = -1;
		var length = 0;
		angular.forEach($scope.Items, function (item) {
			if (item.selected == true) {
				selectedItems.push(item.value);
				$scope.selectedTicketItems.push({ item: item, cateogries: ticketItemPrice(item.itemCategory, angular.copy($scope.Categories)) })
			}
		});

	}

	var initilizeUI = function () {
		$('#TicketVisitDate').datepicker({
			format: "dd/mm/yyyy", modal: true, header: false, footer: false, minDate: today, uiLibrary: 'bootstrap4',
			change: function (e) {
				$scope.TicketVM.VisitDate = e.currentTarget.value;
				if ($scope.selectedTickets.length > 0) {
					getPackagePrice($scope.SelectPackageId, $scope.CategoryId, $scope.selectedTickets[0].cateogries)
				}
				getTimming();
				getItemTimming();
				GetItems();

			}
		});


		ticketItemDetail();
	}
	initilizeUI();

	$scope.IsShowCategoryPanel = function () {
		var isShow = false
		
		if ($scope.TicketType == 'Package') {
			if ($scope.selectedPackageCategory.length > 0) {
				if ($scope.selectedPackageCategory[0].cateogries.length > 0) {
					isShow = true;
				}
			}
		}
		else if ($scope.TicketType == 'Ticket') {

		}
		return isShow;
	}

	$scope.SelectPackage = function (Package) {
		$scope.SelectPackageId = Package;
		getPackagePrice($scope.SelectPackageId, $scope.CategoryId)
		getPackageCategory(Package);

	}

	$scope.SelectItem = function (Item) {
		ticketItemDetail();
		getItemTimming();
	}

	$scope.CategoryTabClick = function (category, selectedPackage) {
		$scope.CategoryId = category.id;
		if (Boolean(selectedPackage)) {
			selectedPackage.cateogries = selectedPackage.cateogries.map(function (c) {
				c.isActive = c.id === category.id;
				return c;
			})
			getPackagePrice($scope.SelectPackageId, $scope.CategoryId);
		}
		else {
			$scope.Categories = $scope.Categories.map(function (c) {
				c.isActive = c.id === category.id;
				return c;
			})
		}
		$scope.CategoryId = category.id

	}
	$scope.ticket_number = function (category, selectedPackage) {
		if (Boolean(selectedPackage)) {
			category.categoryPrice = $scope.Amount;
			category.numberOfComplimentary = getNumberOfComplimentary(category);
			category.categoryGroupPrice = $scope.GroupAmount;
			category.discount = $scope.Discount
			category.discountAmount = $scope.DiscountAmount;
			category.groupDiscountAmount = $scope.GroupDiscountAmount
			category.packageName = $scope.getPackageName(selectedPackage.packageid);
			category.packageId = $scope.Package;
			ticketDetail(category, selectedPackage);
			getPackageItemName();
		}
		else {
			category.numberOfComplimentary = getNumberOfComplimentary(category);
			ticketItemDetail();
		}
	};

	$scope.value_dec = function (category, selectedPackage) {
		category.numberOfTickets = parseInt(category.numberOfTickets) === 0 ? 0 : parseInt(category.numberOfTickets) - 1;
		if (Boolean(selectedPackage)) {
			category.categoryPrice = $scope.Amount
			category.categoryGroupPrice = $scope.GroupAmount;
			category.discount = $scope.Discount
			category.discountAmount = $scope.DiscountAmount;
			category.groupDiscountAmount = $scope.GroupDiscountAmount
			category.numberOfComplimentary = getNumberOfComplimentary(category);
			category.packageName = $scope.getPackageName(selectedPackage.packageid);
			category.packageId = $scope.Package;
			ticketDetail(category, selectedPackage);
			getPackageItemName();
		}
		else {
			category.numberOfComplimentary = getNumberOfComplimentary(category);
			ticketItemDetail();
		}
	}

	$scope.value_inc = function (category, selectedPackage) {
		category.numberOfTickets = parseInt(category.numberOfTickets) + 1;
		if (Boolean(selectedPackage)) {
			category.categoryPrice = $scope.Amount
			category.categoryGroupPrice = $scope.GroupAmount;
			category.discount = $scope.Discount
			category.discountAmount = $scope.DiscountAmount;
			category.groupDiscountAmount = $scope.GroupDiscountAmount
			category.numberOfComplimentary = getNumberOfComplimentary(category);
			category.packageName = $scope.getPackageName(selectedPackage.packageid);
			category.packageId = $scope.Package;
			ticketDetail(category, selectedPackage);
			getPackageItemName();
		} else {
			category.numberOfComplimentary = getNumberOfComplimentary(category);
			ticketItemDetail();
		}
	}

	$scope.gettotal = function (flag) {

		if ($scope.TicketType == 'Package') {
			switch (flag) {
				case "categoryPrice":
					return getCategoriesOnly($scope.selectedTickets).map(function (c) { return ($scope.IsGroupPackage(c) == true ? c.categoryGroupPrice : c.categoryPrice) }).reduce(getSum)
				case "numberOfTickets":
					return getCategoriesOnly($scope.selectedTickets).map(function (c) { return c.numberOfTickets }).reduce(getSum)
				default:
					return getCategoriesOnly($scope.selectedTickets).map(function (c) { return ($scope.IsGroupPackage(c) == true ? ((c.categoryGroupPrice - c.groupDiscountAmount) * c.numberOfTickets) : ((c.categoryPrice - c.discountAmount) * c.numberOfTickets)) }).reduce(getSum)
			}
		}
		else {
			switch (flag) {
				case "categoryPrice":
					return getCategoriesOnly($scope.selectedTicketItems).map(function (c) { return c.categoryPrice }).reduce(getSum)
				case "numberOfTickets":
					return getCategoriesOnly($scope.selectedTicketItems).map(function (c) { return c.numberOfTickets }).reduce(getSum)
				default:
					return getCategoriesOnly($scope.selectedTicketItems).map(function (c) { return (c.categoryPrice - c.discountAmount) * c.numberOfTickets }).reduce(getSum)
			}
		}
	}

	$scope.submitted = function (form) {
		if (!form.$invalid && validate()) {
			var frm = $scope.TicketVM;

			CategoryService.SubmittedTicket(
				{
					FirstName: frm.firstName,
					LastName: frm.lastName,
					MobileNumber: frm.mobileNumber,
					Email: frm.email,
					VisitDate: $('#TicketVisitDate').datepicker().value(),
					VisitTime: frm.visitTime,
					TotalAmount: $scope.gettotal(),
					SelectedTickets: $scope.selectedTickets,
					SelectedItems: $scope.selectedTicketItems,
					IsTicketPackage: $scope.TicketType === 'Package',
					Timming: $scope.Timming
				}).then(function (data) {
					if (data.status) {
						window.location = data.path
					}
				}, function (reason) {
					console.log(reason);
					alert(reason)

				});
		}
	}

	$scope.getPackageName = function (packageId) {
		var _package = $scope.Packages.filter(function (p) {
			if (p.id == packageId)
				return p;
		});

		if (_package.length > 0) {
			return _package[0].packageName
		}
	}


	$scope.SelectTicketType = function () {
		if ($scope.TicketType == 'Package') {
			$scope.selectedTicketItems = [];
		}
		else {
			$scope.selectedTickets = [];
		}
		$scope.Timming = [];
	}
	$scope.IsFormvalid = function () {
		var isvalid = true;

		if ($scope.TicketType == 'Package') {
			if ($scope.selectedTickets.length == 0)
				isvalid = false;
		}
		else {
			if ($scope.selectedTickets.length == 0 && $scope.IsTicketValidate == false)
				isvalid = false;
		}
		return !isvalid;
	}
	$scope.IsGroupPackage = function (Category) {
		if (Category.totalMembers <= Category.numberOfTickets)
			return true;
		else
			return false;
	}

	//FUNCTIONS


	ticketItemPrice = function (itemCategory, Category) {
		var _category = [];
		var _itemcategory = [];
		$scope.IsTicketValidate = false;
		angular.forEach(Category, function (c, i) {
			if (c.numberOfTickets > 0) {

				$scope.IsTicketValidate = true;
				_itemcategory = itemCategory.filter(function (ic) {
					return ic.categoryFK == c.id
				});
				if (_itemcategory.length > 0) {
					c.categoryPrice = _itemcategory[0].salePrice;
					c.discount = _itemcategory[0].specialDiscount.value.discount;
					c.discountAmount = _itemcategory[0].specialDiscount.value.amount;
				}
				_category.push(c);
			}
		});
		return _category;
	}



	GetCategories = function () {
		CategoryService.GetCategories(function (data) {
			$scope.Categories = data.map(function (c, index) {
				c.isActive = index === 0;
				//  c.numberOfTickets = 0;
				return c;
			});
			GetTicketDetail();

		});
	}

	GetCategories();

	GetPackages = function () {
		CategoryService.GetPackages(function (data) {
			$scope.Packages = data;

		});
	}

	GetPackages();

	GetItems = function () {
		CategoryService.GetItems($('#TicketVisitDate').datepicker().value(), selectedItems, function (data) {
			selectedItems
			$scope.Items = data;
			ticketItemDetail();
		});
	}

	GetItems();

	GetTicketDetail = function () {
		CategoryService.GetTicketDetail(function (data) {
			edit(data);
		});
	}

	getCategoriesOnly = function (selectedTicket) {
		var categories = [];
		selectedTicket.map(function (t) {
			categories = categories.concat(t.cateogries);
		});
		return categories;
	}

	validate = function () {
		var isvalidate = true;

		angular.forEach($scope.Timming, function (t, i) {
			if (!Boolean(t.selectedTimming)) {
				if (isvalidate == true) {
					isvalidate = false;
				}
			}
		});
		return isvalidate;
	}

	ticketDetail = function (category, selectedPackage) {
		var selected = [];
		$scope.selectedTickets = [];
		if ($scope.selectedTickets.length == 0) {
			$scope.selectedTickets.push({ packageId: selectedPackage.packageid, cateogries: getTickets(selectedPackage) })
		} else {
			var selectedTickets = $scope.selectedTickets.filter(function (p) { return p.packageId === selectedPackage.packageid });
			if (selectedTickets.length == 0) {
				$scope.selectedTickets.push({ packageId: selectedPackage.packageid, cateogries: getTickets(selectedPackage) });
			}
			else {
				$scope.selectedTickets.filter(function (p) {
					if (p.packageId === selectedPackage.packageid) { p.cateogries = getTickets(selectedPackage) }
				});
			}

		}
		angular.forEach($scope.selectedTickets, function (s, i) {
			if (s.cateogries.length == 0) {
				$scope.selectedTickets.splice(i, 1);
			}
		});
		getTimming();
	}

	getTickets = function (selectedPackage) {
		var selected = [];
		angular.forEach(selectedPackage.cateogries, function (c, i) {
			if (c.numberOfTickets > 0) {
				selected.push(c);
			}
		});
		return selected;
	}

	getSum = function (total, num) {
		return parseInt(total) + parseInt(num);
	}

	getPackagePrice = function (PackageId, CategoryId, Category) {
		var date = $('#TicketVisitDate').datepicker().value();
		if (PackageId != undefined && CategoryId != undefined) {
			$scope.IsValid = false
			if (Boolean(Category) == false) {
				CategoryService.GetPackagesPrice(PackageId, CategoryId, date, function (response) {
					$scope.Amount = response.data.amount;
					$scope.Discount = response.data.discount;
					$scope.GroupAmount = response.data.groupAmount;
					$scope.DiscountAmount = response.data.packageDiscountAmount;
					$scope.GroupDiscountAmount = response.data.groupDiscountAmount;
				});
			} else {
				angular.forEach(Category, function (c, i) {
					if (c.date != date) {
						CategoryService.GetPackagesPrice(PackageId, c.id, date, function (response) {
							$scope.Amount = response.data.amount;
							$scope.Discount = response.data.discount;
							$scope.GroupAmount = response.data.groupAmount;
							$scope.DiscountAmount = response.data.packageDiscountAmount;
							$scope.GroupDiscountAmount = response.data.groupDiscountAmount;
							getPackagePriceDateWise(c.id);

						});
					}
				});
			}

		}
		else {
			$scope.IsValid = true
		}

	}

	getPackageCategory = function () {
		if ($scope.selectedPackageCategory.length === 0) {

			$scope.selectedPackageCategory.push({ packageid: $scope.SelectPackageId, cateogries: getCatgory() });

		} else {
			var selectedPkg = $scope.selectedPackageCategory.filter(function (p) { return p.packageid === $scope.SelectPackageId });
			if (selectedPkg.length === 0) {
				$scope.selectedPackageCategory.push({ packageid: $scope.SelectPackageId, cateogries: getCatgory() });
			}
		}

	}

	getPackageItemName = function () {
		var items = []
		var length = 0
		angular.forEach(angular.copy($scope.Packages), function (p, i) {

			length = $scope.selectedTickets.filter(function (t) {
				return t.packageId == p.id
			}).length;
			if (length > 0)
				items.push({ packageFK: p.id, packageName: p.packageName, itemName: p.itemName })
		});
		$scope.PackageItemName = items;
	}
	getCatgory = function () {
		var _category = [];
		angular.forEach(angular.copy($scope.Categories), function (c, i) {
			c.numberOfTickets = 0;
			_category.push(c);
		});
		return _category;
	}

	bindCategories = function (category) {
		angular.forEach($scope.Categories, function (c, i) {
			var items = category.filter(function (d) { return d.id === c.id });
			if (items.length == 0) {
				category.push(c);
			}
		});
		return category;
	}

	edit = function (data) {

		if (data != null && Boolean(data)) {

			$scope.TicketVM = data;
			$scope.selectedTickets = Boolean(data.selectedTickets) ? data.selectedTickets : [];
			$scope.selectedTicketItems = Boolean(data.selectedItems) ? data.selectedItems : [];
			$scope.TicketType = Boolean(data.isTicketPackage) ? 'Package' : 'Ticket';
			$scope.Timming = [];//data.timming
			var dateArray = data.visitDate.split('/');
			var d = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0])
			$scope.TicketVM.visitDate = d.getDate() + "/" + (d.getMonth() + 1) + '/' + d.getFullYear()
			$('#TicketVisitDate').datepicker().value($scope.TicketVM.visitDate);
			$('#TicketVisitTime').timepicker().value(data.visitTime);



			angular.forEach($scope.selectedTickets, function (c, i) {
				if ($scope.selectedPackageCategory.length === 0) {
					$scope.selectedPackageCategory.push({ packageid: c.packageId, cateogries: bindCategories(angular.copy(c.cateogries)) });
				} else {
					var selectedPkg = $scope.selectedPackageCategory.filter(function (p) { return p.packageid === c.packageId });
					if (selectedPkg.length === 0) {
						$scope.selectedPackageCategory.push({ packageid: c.packageId, cateogries: bindCategories(angular.copy(c.cateogries)) });
					}
				}
			});
		}

	}

	getTimming = function () {
		var PackageFK = [];
		angular.forEach($scope.selectedTickets, function (c, i) {
			PackageFK.push(c.packageId);
		});
		if (PackageFK.length > 0 && $('#TicketVisitDate').datepicker().value() != "") {
			CategoryService.GetTimming(PackageFK, $('#TicketVisitDate').datepicker().value(),
				function (data) {
					$scope.Timming = data.timming
				});
		}
	}

	getItemTimming = function () {
		var length = 0;

		var index = -1;
		var itemTimming = [];
		if ($scope.TicketType == 'Ticket') {
			angular.forEach($scope.Items, function (item, i) {
				itemTimming = $scope.Timming.filter(function (t, _index) {
					return t.itemFK == item.value
				});
				length = itemTimming.length;
				if (item.selected) {
					if (length == 0) { bindTimming(item); }
				}
				else {
					if (length > 0) {
						index = $scope.Timming.indexOf(itemTimming[0])
						$scope.Timming.splice(index, 1);
					}
				}
			});
		}
	}


	bindTimming = function (item) {
		var strDate = $('#TicketVisitDate').datepicker().value();
		if (Boolean(item.value) && Boolean(strDate)) {
			CategoryService.GetItemTimming(item.value, strDate,
				function (data) {
					$scope.Timming = $scope.Timming.concat(data.timming);
				});
		}

	}

	getNumberOfComplimentary = function (Category) {
		var numberOfComplimentary = 0;
		numberOfComplimentary = Category.numberOfTickets / Category.totalMembers;
		numberOfComplimentary = parseInt(numberOfComplimentary);
		numberOfComplimentary = numberOfComplimentary * Category.complimentary;
		return numberOfComplimentary;
	}

	getPackagePriceDateWise = function (categoryId) {
		if ($scope.selectedTickets.length == 0)
			return;

		var date = $('#TicketVisitDate').datepicker().value()
		var ticketItem = $scope.selectedTickets[0];
		var packageId = ticketItem.packageId;

		var _category = ticketItem.cateogries.filter(function (c) {
			if (c.id == categoryId)
				return d;
		});
		if (_category.length > 0) {
			if (_category.date != date) {

				_category = _category[0];
				_category.date = date;
				_category.categoryPrice = $scope.Amount;
				_category.categoryGroupPrice = $scope.GroupAmount;
				_category.discount = $scope.Discount
				_category.discountAmount = $scope.DiscountAmount;
				_category.groupDiscountAmount = $scope.GroupDiscountAmount
			}
		}


	}
});


