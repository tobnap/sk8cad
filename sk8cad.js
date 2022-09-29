
// title      : SK8CAD-VANILLA
// author     : Beau Trifiro
// license    : Copyright 2020 - present, Open Source Skateboards
// description: Skateboard and mold customizer
// last edit  : 9 June 2022
// version	  : 1.3.6
// rev notes  : x.x.6: Fixed single kick transitions.
//				x.x.5: Fixed offset tub transition section length issue (tagged 6/8/22).
//				x.x.4: Fixed transition sections (mirror function not working properly), duplicate kicknose/kicktail.
//				x.x.3: Fixed boolean operation when showing deck, other bug fixes.
//				x.x.2: Fixed "show profile" feature.
//				x.x.1: Updated mold bore locations when print width >= mold width.
//				x.x.0: Updated female transition section offsets, fixed radial concave bug, fixed issue with kick base drops.


function getParameterDefinitions() {
	return ([
		{ name: 'display_title', caption: '<span class="category">Display</span>', type: 'group', class: 'category' },
		{ name: 'display_item', caption: 'Show ', type: 'choice', values: [0, 1, 2, 3, 4, 5], initial: 2, captions: ['Board', 'Male Mold', 'Female Mold', 'Inverted Male Mold', 'Inverted Female Mold', 'Both'] },
		{ name: 'display_inches', type: 'checkbox', checked: false, caption: 'Dual Unit Display' },

		{ name: 'mold_design', caption: '<hr> <span class="category">Mold Specs</span>', type: 'group' },

		{ name: 'mold_length', id: 'mold_length_id', type: 'float', min: 1, max: 120, caption: 'Length, in <span id="moldLengthInches" class="inchDisplay" > </span>', initial: 34, step: 0.5 },
		{ name: 'mold_width', id: 'mold_width_id', caption: 'Width, in <span id="moldWidthInches" class="inchDisplay" > </span>', type: 'float', initial: 9.5, min: 1, max: 36, step: 0.5 },
		{ name: 'mold_height', id: 'mold_height_id', caption: 'Mold Height, in <span id="moldHeightInches" class="inchDisplay" > </span>', type: 'float', initial: 3, min: 1, step: 0.125 },
		//{ name: 'female_mold_height', caption: 'Female Mold Height, in', type: 'float', initial: 4, min: 1, step: 0.125},
		{ name: 'mold_offset', type: 'float', initial: 0.875, step: 0.0625, caption: 'Mold Offset, in <span id="moldOffsetInches" class="inchDisplay" > </span>' },

		//{ name: 'min_cavity_height', type: 'float', initial: 3, step: 0.125, caption: 'Min. Female Mold Height, in'},

		{ name: 'mold_holes', type: 'checkbox', checked: true, caption: 'Include Truck Holes' },
		{ name: 'truck_hole_diameter', caption: 'Truck Hole Diameter, in <span id="truckHoleDiameterInches" class="inchDisplay" > </span>', type: 'float', initial: 0.1875, min: 0.05, max: 1, step: 0.01 },

		{ name: 'make_notches', type: 'checkbox', checked: false, caption: 'Alignment Notches' },
		{ name: 'notch_size', caption: 'Notch Diameter, in <span id="notchSizeInches" class="inchDisplay" > </span>', type: 'float', initial: 0.5, min: 0.05, max: 1, step: 0.01 },

		/*{ name: 'resolution', type: 'float', initial: 0.25, step: 0.0625, min: 0, max: 0.5, caption: 'Model Resolution<br><span style="font-size: 9px;">(For exporting)</span>'},
		*/

		{ name: 'model_res', type: 'float', initial: 8, step: 4, min: 4, max: 16, caption: 'Model Resolution<br><span style="font-size: 9px;">(For exporting)</span>' },

		{ name: 'print_settings', caption: '<hr> <span class="category">Sections</span>', type: 'group' },

		{ name: 'print_width', type: 'float', initial: 4.75, step: 1, min: 5, max: 15, caption: 'Print Section Width, in<br> <span id="printWidthInches" class="inchDisplay" > </span>' },
		{ name: 'print_length', type: 'float', initial: 6.8, step: 1, min: 5, max: 15, caption: 'Print Section Length, in<br> <span id="printLengthInches" class="inchDisplay" > </span>' },

		{ name: 'make_bores', type: 'checkbox', checked: false, caption: 'Mold Bores' },

		{ name: 'bore_diameter', type: 'float', initial: 0.25, step: 0.01, min: 0.02, max: 1, caption: 'Bore Diameter, in <span id="boreDiameterInches" class="inchDisplay" > </span>' },
		{ name: 'bore_depth', type: 'float', initial: 0.3, step: 0.1, min: 0.02, max: 2, caption: 'Bore Depth, in <span id="boreDepthInches" class="inchDisplay" > </span>' },
		{ name: 'bore_spacing', type: 'float', initial: 0.5, step: 0.1, min: 0.02, max: 2, caption: 'Bore Spacing, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },

		{ name: 'make_mold_zipties', type: 'checkbox', checked: true, caption: 'Ziptie mold' },
		{ name: 'nose_nose_male_ziptie', type: 'float', initial: 0.75, step: 0.05, min: 0, max: 5, caption: 'Male Nose to Nose Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'anose_nose_male_ziptie', type: 'float', initial: 3, step: 0.05, min: 0, max: 5, caption: 'Male Adjacent Nose to Nose Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'center_male_ziptie', type: 'float', initial: 2.55, step: 0.05, min: 0, max: 5, caption: 'Male Center Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'atail_tail_male_ziptie', type: 'float', initial: 3, step: 0.05, min: 0, max: 5, caption: 'Male Adjacent Tail to Tail Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'tail_tail_male_ziptie', type: 'float', initial: 1, step: 0.05, min: 0, max: 5, caption: 'Male Tail to Tail Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'nose_nose_female_ziptie', type: 'float', initial: 3, step: 0.05, min: 0, max: 5, caption: 'Female Nose to Nose Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'anose_nose_female_ziptie', type: 'float', initial: 0.8, step: 0.05, min: 0, max: 5, caption: 'Female Adjacent Nose to Nose Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'center_female_ziptie', type: 'float', initial: 1.25, step: 0.05, min: 0, max: 5, caption: 'Female Center Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'atail_tail_female_ziptie', type: 'float', initial: 0.8, step: 0.05, min: 0, max: 5, caption: 'Female Adjacent Tail to Tail Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },
		{ name: 'tail_tail_female_ziptie', type: 'float', initial: 2.75, step: 0.05, min: 0, max: 5, caption: 'Female Tail to Tail Ziptie Height, in <span id="boreSpacingInches" class="inchDisplay" > </span>' },

		{ name: 'export_in_mm', type: 'checkbox', checked: false, caption: 'Export section in mm' },
		{ name: 'router_template', type: 'checkbox', checked: false, caption: 'Router Template' },

		{ name: 'printSection', caption: 'Section to Download', type: 'choice', values: ['NONE', 'C', '1N', '1T', '2N', '2T', '3N', '3T'], initial: 0, captions: ['None', 'Center', 'Adjacent Nose', 'Adjacent Tail', 'Nose', 'Tail', 'Extended Nose', 'Extended Tail'] },

		{ name: 'board_design', caption: '<hr> <span class="category">Design Your Board</span> <br> <p style="font-size: 11px; font-weight: normal;"> Board Length: <span id="lengthDisplay"> </span> <span id="boardLengthInches" class="inchDisplay"> </span> <br> <span style="font-size: 9px; font-weight: normal;"> (To change this, update wheelbase,<br> nose length, and tail length.) </span> </p>', type: 'group' },
		{ name: 'profile', type: 'checkbox', checked: false, caption: 'Show Board Outline, Only <br>(Faster rendering)' },
		{ name: 'width', id: 'width_id', type: 'float', initial: 8.25, step: 0.125, caption: 'Width, in <span id="widthInches" class="inchDisplay" > </span>' },
		{ name: 'wheelbase', id: 'wheelbase_id', type: 'float', initial: 14.0, step: 0.125, caption: 'Wheelbase, in <span id="wheelbaseInches" class="inchDisplay" > </span>' },
		{ name: 'nose_length', id: 'nose_length_id', type: 'float', initial: 6.75, step: 0.125, caption: 'Nose Length, in <span id="noseLengthInches" class="inchDisplay" > </span>' },
		{ name: 'tail_length', id: 'tail_length_id', type: 'float', initial: 6.5, step: 0.125, caption: 'Tail Length, in <span id="tailLengthInches" class="inchDisplay" > </span>' },
		{ name: 'concave_drop', id: 'concave_drop_id', type: 'float', initial: 0.4, step: 0.1, max: 0.6, min: 0.0, caption: 'Concave Drop, in <span id="concaveDropInches" class="inchDisplay" > </span>' }, // concave_radius=0, make flat board

		{ name: 'tub_concave', id: 'tub_concave_id', type: 'checkbox', checked: true, caption: 'Tub Concave' },
		{ name: 'flat_width', id: 'flat_width_id', type: 'float', initial: 2.0, step: 0.125, caption: 'Flat Concave Width, in<br> <span id="flatWidthInches" class="inchDisplay" > </span>' },
		//{ name: 'tub_angle', type: 'float', initial: 11, step: 0.25, caption: 'Tub Angle, deg.'},
		{ name: 'tub_radius', id: 'tub_radius_id', type: 'float', initial: 6, step: 0.5, caption: 'Tub Radius, in <span id="tubRadInches" class="inchDisplay" > </span>' },
		{ name: 'kicknose_angle', id: 'kicknose_angle_id', type: 'float', initial: 20.0, step: 1, min: 0, max: 25.0, caption: 'Kicknose, deg' },
		{ name: 'kicktail_angle', id: 'kicktail_angle_id', type: 'float', initial: 19.0, step: 1, min: 0, max: 25.0, caption: 'Kicktail, deg' },
		{ name: 'nose_radius', id: 'nose_radius_id', type: 'float', initial: 4, step: 1, max: 20, min: 4, caption: 'Nose Radius, in <span id="noseRadiusInches" class="inchDisplay" > </span>' },
		{ name: 'tail_radius', id: 'tail_radius_id', type: 'float', initial: 5, step: 1, max: 20, min: 4, caption: 'Tail Radius, in <span id="tailRadiusInches" class="inchDisplay" > </span>' },
		{ name: 'transition_length', id: 'transition_length_id', type: 'float', initial: 4, step: 0.25, max: 8, min: 3, caption: 'Transition Length, in<br> <span id="transitionLengthInches" class="inchDisplay" > </span>' },
		{ name: 'kick_gap', id: 'kick_gap_id', type: 'float', initial: 1, step: 0.125, max: 3, min: 0, caption: 'Kick Gap, in <span id="kickGapInches" class="inchDisplay" > </span>' },


		{ name: 'kick_concave_label', caption: '<span class="category">Kick Concave</span>', type: 'group' },
		{ name: 'kick_concave', id: 'kick_concave_id', type: 'checkbox', checked: false, caption: 'Concave in Kicks' },

		{ name: 'nose_base_drop', id: 'nose_base_drop_id', type: 'float', initial: 0.125, step: 0.03125, max: 0.2, min: 0, caption: 'Nose Base Drop, in<br> <span id="noseDropInches" class="inchDisplay" > </span>' },
		{ name: 'nose_edge_kick_angle', id: 'nose_edge_kick_angle_id', type: 'float', initial: 1, step: 0.5, max: 3, min: 0, caption: 'Add. Angle - Nose, deg' },
		{ name: 'nose_edge_kick_rad', id: 'nose_edge_kick_rad_id', type: 'float', initial: 1, step: 0.5, max: 3, min: 0, caption: 'Add. Radius - Nose, in<br> <span id="noseEdgeRadInches" class="inchDisplay" > </span>' },

		{ name: 'tail_base_drop', id: 'tail_base_drop_id', type: 'float', initial: 0.125, step: 0.03125, max: 0.2, min: 0, caption: 'Tail Base Drop, in<br> <span id="tailDropInches" class="inchDisplay" > </span>' },
		{ name: 'tail_edge_kick_angle', id: 'tail_edge_kick_angle_id', type: 'float', initial: 1, step: 0.5, max: 3, min: 0, caption: 'Add. Angle - Tail, deg' },
		{ name: 'tail_edge_kick_rad', id: 'tail_edge_kick_rad_id', type: 'float', initial: 1, step: 0.5, max: 3, min: 0, caption: 'Add. Radius - Tail, in<br> <span id="tailEdgeRadInches" class="inchDisplay" > </span>' },
		{ name: 'kcRes', id: 'kcRes_id', type: 'slider', class: 'paramSlider', min: -4, max: 4, initial: 0, step: 1, caption: 'Kick Concave Resolution' },

		{ name: 'show_contours', type: 'checkbox', checked: false, caption: 'Show Contours' },
		{ name: 'contour_res', caption: 'Contour Resolution ', type: 'choice', values: [0.0625, 0.125, 0.25, 0.5], initial: 0.25, captions: ['Ultra fine', 'Fine', 'Medium', 'Coarse'] },





		{ name: 'cutout_specs', caption: '<span class="category">Shape Controls</span>', type: 'group' },

		{ name: 'taperN', id: 'taperN_id', type: 'float', initial: 7, step: 0.125, caption: 'Nose Taper Point, in<br> <span id="noseTaperInches" class="inchDisplay" > </span>' },
		{ name: 'taperT', id: 'taperT_id', type: 'float', initial: 7.25, step: 0.125, caption: 'Tail Taper Point, in<br> <span id="tailTaperInches" class="inchDisplay" > </span>' },
		{ name: 'nose_adjust', id: 'nose_adjust_id', type: 'slider', class: 'paramSlider tipShapes', min: 50, max: 100, initial: 72, step: 1, caption: '<span class="tipShapes">Nose Shape</span>' },
		{ name: 'tail_adjust', id: 'tail_adjust_id', type: 'slider', class: 'paramSlider tipShapes', min: 50, max: 100, initial: 70, step: 1, caption: '<span class="tipShapes">Tail Shape</span>' },

		{ name: 'make_cutouts', id: 'make_cutouts_id', type: 'checkbox', checked: false, caption: 'Advanced Shapes' },
		{ name: 'noseLipX', id: 'noseLipX_id', type: 'slider', class: 'paramSlider cutoutSpecs', min: 5, max: 18, step: 0.1, initial: 10, caption: '<span class="cutoutSpecs">Nose Cutout Depth</span>' },
		{ name: 'noseLipY', id: 'noseLipY_id', type: 'slider', class: 'paramSlider cutoutSpecs', min: -2, max: 4, step: 0.1, initial: 4, caption: '<span class="cutoutSpecs">Nose Cutout Width</span>' },
		{ name: 'noseY', id: 'noseY_id', type: 'slider', class: 'paramSlider cutoutSpecs', min: 2, max: 9, initial: 4, step: 0.1, caption: '<span class="cutoutSpecs">Nose Width</span>' },
		{ name: 'tailLipX', id: 'tailLipX_id', type: 'slider', class: 'paramSlider cutoutSpecs', min: 5, max: 18, step: 0.1, initial: 12, caption: '<span class="cutoutSpecs">Tail Cutout Depth</span>' },
		{ name: 'tailLipY', id: 'tailLipY_id', type: 'slider', class: 'paramSlider cutoutSpecs', min: -2, max: 4, step: 0.1, initial: 2, caption: '<span class="cutoutSpecs">Tail Cutout Width</span>' },
		{ name: 'tailY', id: 'tailY_id', type: 'slider', class: 'paramSlider cutoutSpecs', min: 2, max: 9, initial: 6, step: 0.1, caption: '<span class="cutoutSpecs">Tail Width</span>' }
	]);
}
function main(parameters) {

	var display = parameters.display_item;
	var mold_size;

	var mold_length = parameters.mold_length;
	var mold_width = parameters.mold_width;
	var mold_height = parameters.mold_height;
	var actual_cav_height = mold_height; //stock material height

	var mold_holes = parameters.mold_holes;
	var truck_hole_diameter = parameters.truck_hole_diameter;
	var make_notches = parameters.make_notches;
	var notch_diameter = parameters.notch_size;

	var model_res = parameters.model_res;
	var tub_res = 2 / model_res;

	var showProfile = parameters.profile;


	var mold_choice = '0';
	var profile_choice = mold_choice;

	var printSection = parameters.printSection;
	var make_bores = parameters.make_bores;
	var bore_dia = parameters.bore_diameter;
	var bore_depth = parameters.bore_depth;
	var bore_spacing = parameters.bore_spacing;

	var make_mold_zipties = parameters.make_mold_zipties;
	var nose_nose_male_ziptie = parameters.nose_nose_male_ziptie;
	var anose_nose_male_ziptie = parameters.anose_nose_male_ziptie;
	var center_male_ziptie = parameters.center_male_ziptie;
	var atail_tail_male_ziptie = parameters.atail_tail_male_ziptie;
	var tail_tail_male_ziptie = parameters.tail_tail_male_ziptie;
	var nose_nose_female_ziptie = parameters.nose_nose_female_ziptie;
	var anose_nose_female_ziptie = parameters.anose_nose_female_ziptie;
	var center_female_ziptie = parameters.center_female_ziptie;
	var atail_tail_female_ziptie = parameters.atail_tail_female_ziptie;
	var tail_tail_female_ziptie = parameters.tail_tail_female_ziptie;

	var export_in_mm = parameters.export_in_mm;
	var router_template = parameters.router_template;

	var make_cutouts;

	var width;
	var wheelbase;
	var tail_length;
	var nose_length;
	var nose_shape;
	var tail_shape;
	var taperN;
	var taperT;
	var noseLipX;
	var noseLipY;
	var noseY;
	var tailLipX;
	var tailLipY;
	var tailY;

	var concave_drop;
	var concave_radius;
	var kicknose_angle;
	var kicktail_angle;
	var kicknose_radius;
	var kicktail_radius;
	var kick_gap;

	var mold_offset = parameters.mold_offset;
	var min_cavity_height = 3;//parameters.min_cavity_height;

	var thickness = 0.4375;
	var bolt_pattern_width = 1.625;
	var bolt_pattern_length = 2.125;
	var nose_transition_length;
	var tail_transition_length;

	nose_transition_length = parameters.transition_length;
	tail_transition_length = parameters.transition_length;

	var mold_length;
	var mold_width;
	var mold_height;

	var max_cav_height;
	var low_point;
	var new_cav_base

	var contour_res = parameters.contour_res;

	var tub_concave = parameters.tub_concave;
	var flat_width = parameters.flat_width;
	//var tub_angle = parameters.tub_angle;
	var tub_radius = parameters.tub_radius;

	width = parameters.width;
	wheelbase = parameters.wheelbase;
	tail_length = parameters.tail_length;
	nose_length = parameters.nose_length;
	nose_shape = parameters.nose_adjust / 100;
	tail_shape = parameters.tail_adjust / 100;
	taperN = parameters.taperN;
	taperT = parameters.taperT;
	noseLipX = parameters.noseLipX;
	noseLipY = parameters.noseLipY;
	noseY = parameters.noseY;
	tailLipX = parameters.tailLipX;
	tailLipY = parameters.tailLipY;
	tailY = parameters.tailY;
	make_cutouts = parameters.make_cutouts;

	var make_contours = parameters.show_contours;
	var kcRes = parseFloat(parameters.kcRes);

	var a = 1;
	var loopCheck = false; //to track if we are showing both molds




	var modelArray = [];
	var boardDisplay = false;
	if (display == '0' || router_template) {
		boardDisplay = true;
		mold_offset = 0.4375;

		if (router_template) {
			display = '0';
		}
	}

	if (showProfile == true) {

		if (make_cutouts == false) {
			skateboard = make_profile(width, wheelbase, bolt_pattern_length, nose_length, tail_length, length, taperN, taperT, nose_shape, tail_shape, depth);
		}

		else {
			skateboard = make_lb_profile(width, wheelbase, bolt_pattern_length, nose_length, tail_length, length, taperN, taperT, depth, noseLipX, noseLipY, noseY, tailLipX, tailLipY, tailY)

		}

		var hole_depth = 6;
		skateboard = skateboard.subtract(make_wheelbase(bolt_pattern_length, bolt_pattern_width, wheelbase, hole_depth, truck_hole_diameter));
		skateboard = color([0, 0.99, 0.99], skateboard);

		return skateboard;
	}

	while (a == 1) {
		if (loopCheck) { //true if we did one iteration (for display ='1') already
			display = '2'; //make female mold
			loopCheck == false; //turn off so we don't repeat
		}

		if (display == '5' || display == '0') { //make both molds
			a = 0; //reset counter
			display = '1'; //make male mold
			loopCheck = true; //store this so we make female mold in second iteration
		}

		a = a + 1; //if display isn't 5, end while loop after this iteration



		if (mold_choice == '0') {
			concave_drop = parseFloat(parameters.concave_drop);
			concave_radius = (Math.pow((width / 2), 2) + Math.pow(concave_drop, 2)) / (2 * concave_drop);
			if (concave_drop == 0) {
				tub_concave = false;
				concave_radius = 0;
			}
			kicknose_angle = parameters.kicknose_angle;
			kicktail_angle = parameters.kicktail_angle;

			kicknose_radius = parameters.nose_radius;
			kicktail_radius = parameters.tail_radius;

			var kick_concave = parameters.kick_concave;

			if (kick_concave == true) {
				nose_base_drop = parameters.nose_base_drop;
				tail_base_drop = parameters.tail_base_drop;
			}

			else {
				nose_base_drop = 0;
				tail_base_drop = 0;
			}

			nose_edge_kick_angle = parameters.nose_edge_kick_angle + kicknose_angle;
			nose_edge_kick_rad = parameters.nose_edge_kick_rad + kicknose_radius;


			tail_edge_kick_angle = parameters.tail_edge_kick_angle + kicktail_angle;
			tail_edge_kick_rad = parameters.tail_edge_kick_rad + kicktail_radius;

			kick_gap = parseFloat(parameters.kick_gap);

			// mold_size = parameters.mold_size;
		}


		else {
			switch (mold_choice) {
				case '1': //street deck
					concave_drop = 0.375;
					concave_radius = (Math.pow((width / 2), 2) + Math.pow(concave_drop, 2)) / (2 * concave_drop);
					if (concave_drop == 0) {
						concave_radius = 0;
					}
					kicknose_angle = 20;
					kicktail_angle = 20;

					kicknose_radius = 6;
					kicktail_radius = 6;

					kick_gap = 1;

					//mold_size = '0';
					break;

				case '2': //dancer
					concave_drop = 0.125;
					concave_radius = (Math.pow((width / 2), 2) + Math.pow(concave_drop, 2)) / (2 * concave_drop);
					if (concave_drop == 0) {
						concave_radius = 0;
					}
					kicknose_angle = 12;
					kicktail_angle = 12;

					kicknose_radius = 6;
					kicktail_radius = 6;

					kick_gap = 1;

					mold_size = '1';
					break;

				case '3': //cruiser
					concave_drop = 0.25;
					concave_radius = (Math.pow((width / 2), 2) + Math.pow(concave_drop, 2)) / (2 * concave_drop);
					if (concave_drop == 0) {
						concave_radius = 0;
					}
					kicknose_angle = 12;
					kicktail_angle = 21;

					kicknose_radius = 6;
					kicktail_radius = 6;

					kick_gap = 1;

					// mold_size = '0';
					break;
			}

		}




		kick_to_kick = wheelbase + (2 * bolt_pattern_length) + (2 * kick_gap);


		var kicknose_length = (wheelbase / 2) + bolt_pattern_length + nose_length - (kick_to_kick / 2);
		var kicktail_length = (wheelbase / 2) + bolt_pattern_length + tail_length - (kick_to_kick / 2);

		var nose_offset = (nose_length - tail_length) / 2;

		var mold_kicknose_length = ((mold_length - kick_to_kick) / 2) + nose_offset;
		var mold_kicktail_length = ((mold_length - kick_to_kick) / 2) - nose_offset;

		var slice_thickness = parseFloat(parameters.resolution);

		var min_radius = concave_radius;

		var length = wheelbase + (bolt_pattern_length * 2) + tail_length + nose_length;
		var concave_length = length - (kicktail_length + kicknose_length + nose_transition_length + tail_transition_length);
		var flat_concave_length = concave_length + nose_transition_length + tail_transition_length;

		//find kicknose translation parameters
		var kicknose_hypotenuse = 2 * (kicknose_radius * sin(kicknose_angle / 2));
		var kicknose_radius_length = kicknose_hypotenuse * cos(kicknose_angle / 2);
		var kicknose_radius_height = kicknose_hypotenuse * sin(kicknose_angle / 2);

		//find kicktail translation parameters
		var kicktail_hypotenuse = 2 * (kicktail_radius * sin(kicktail_angle / 2));
		var kicktail_radius_length = kicktail_hypotenuse * cos(kicktail_angle / 2);
		var kicktail_radius_height = kicktail_hypotenuse * sin(kicktail_angle / 2);

		var number_of_segments = 8; //for transition section resolution

		var skateboard;

		var depth = 1; /*depth of profile*/



		/*
		    
		  if (display == 0) {
			  /**skateboard = make_concave(concave_radius, thickness, concave_length, width,flat_concave_length).translate([0,0,thickness]);*/

		/*
			if (kicknose_angle !== 0) {
				skateboard = skateboard.union(make_kicknose_curve(kicknose_radius, thickness, width, kicknose_angle, nose_transition_length, concave_length));
			}
			else {
				skateboard = skateboard.union(make_concave(concave_radius, thickness, concave_length, width,flat_concave_length).translate([concave_length,0,thickness]));
			}
			
			if (kicktail_angle !== 0) {
				skateboard = skateboard.union(make_kicktail_curve(kicktail_radius, thickness, width, kicktail_angle, tail_transition_length, concave_length));
			}
			else {
				skateboard = skateboard.union(make_concave(concave_radius, thickness, concave_length, width,flat_concave_length).translate([-concave_length,0,thickness]));
			}
			
			if (kicknose_angle !== 0) {
				skateboard = skateboard.union(make_kicknose_section(wheelbase, bolt_pattern_length, nose_length, kicknose_length, kicknose_radius_length, width, kicknose_radius_height, thickness, kicknose_angle, nose_transition_length, concave_length));
			}
			
			if (kicktail_angle !== 0) {
				skateboard = skateboard.union(make_kicktail_section(wheelbase, bolt_pattern_length, tail_length, kicktail_length, kicktail_radius_length, width, kicktail_radius_height, thickness, kicktail_angle, tail_transition_length, concave_length));
			}
			
			if (concave_radius!==0) {
				if (kicknose_angle !== 0) {
					skateboard = skateboard.union(
				((rotate([0,0,90], make_transition_section(nose_transition_length, thickness, slice_thickness, width, min_radius, number_of_segments)))).translate([concave_length/2+nose_transition_length,0,0]));
				}
				if (kicktail_angle !== 0) {
					skateboard = skateboard.union(
				((rotate([0,0,-90], make_transition_section(tail_transition_length, thickness, slice_thickness, width, min_radius, number_of_segments)))).translate([-(concave_length/2+tail_transition_length),0,0]));
				}
			}
			
		var profile;
		if (make_cutouts == false) {
			profile = make_profile(width, wheelbase, bolt_pattern_length, nose_length, tail_length, length, taperN, taperT, nose_shape, tail_shape, 10);
		}
	    
		else {
			profile = make_lb_profile(width, wheelbase, bolt_pattern_length, nose_length, tail_length, length, taperN, taperT, 10, noseLipX, noseLipY, noseY, tailLipX, tailLipY, tailY)
		}
	    
		skateboard = skateboard.intersect(profile);
	  
	  
	  
		 }
		 */


		if (display == '2' || display == '4') { // 1/27/21 add cavity

			//adjust parameters for offset:
			var nose_rad_original = kicknose_radius;
			var tail_rad_original = kicktail_radius;
			var nose_base_drop_original = nose_base_drop;
			var tail_base_drop_original = tail_base_drop;
			kicknose_radius += mold_offset;
			kicktail_radius += mold_offset;
			if (concave_radius !== 0) {
				concave_radius += mold_offset;
				min_radius += mold_offset;
			}


			if (nose_base_drop !== 0) {
				var nBR = (Math.pow(nose_base_drop, 2) + Math.pow(mold_width / 2, 2)) / (2 * nose_base_drop); //kick base radius
				nBR += mold_offset;
				nose_base_drop = (-(-2 * nBR) - sqrt(Math.pow(2 * nBR, 2) - (4 * 1 * Math.pow(mold_width / 2, 2)))) / (2);
			}

			if (tail_base_drop !== 0) {
				var tBR = (Math.pow(tail_base_drop, 2) + Math.pow(mold_width / 2, 2)) / (2 * tail_base_drop); //kick base radius
				tBR += mold_offset;
				tail_base_drop = (-(-2 * tBR) - sqrt(Math.pow(2 * tBR, 2) - (4 * 1 * Math.pow(mold_width / 2, 2)))) / (2);
			}

			if (kicknose_angle !== 0) {
				if (kick_concave == false) {
					kicknose = make_mold_kicknose_curve(kicknose_radius, mold_width, kicknose_angle, nose_transition_length, concave_length, kicknose_length);
				}
				else { //bt edit 3/29
					kicknose = make_concave_kick_offset(mold_width, nose_rad_original, kicknose_angle, nose_base_drop_original, nose_edge_kick_rad, nose_edge_kick_angle, mold_kicknose_length, mold_height - mold_offset, kcRes, mold_offset);
					kicknose = mirror([0, 0, 1], kicknose);
					kicknose = rotate([0, 0, -90], (kicknose.translate([0, kick_to_kick / 2, 0])));
				}
			}

			else {
				if (tub_concave == true) {
					kicknose = make_tub_concave(concave_drop, mold_height, mold_kicknose_length + nose_transition_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res, mold_offset, true).translate([(mold_kicknose_length + nose_transition_length) / 2 + concave_length / 2, 0, 0]);
				}

				else {
					kicknose = make_mold_concave(concave_radius, mold_height, mold_kicknose_length + nose_transition_length, mold_width, flat_concave_length).translate([(mold_kicknose_length + nose_transition_length) / 2 + concave_length / 2, 0, 0]);
				}
			}

			if (kicktail_angle !== 0) {
				if (kick_concave == false) {
					kicktail = make_mold_kicktail_curve(kicktail_radius, mold_width, kicktail_angle, tail_transition_length, concave_length, kicktail_length);
				}
				else { //bt edit 3/29
					kicktail = make_concave_kick_offset(mold_width, tail_rad_original, kicktail_angle, tail_base_drop_original, tail_edge_kick_rad, tail_edge_kick_angle, mold_kicktail_length, mold_height - mold_offset, kcRes, mold_offset);
					kicktail = mirror([0, 0, 1], kicktail);
					kicktail = rotate([0, 0, 90], (kicktail.translate([0, kick_to_kick / 2, 0])));

				}
			}

			else {
				if (tub_concave == true) {
					kicktail = make_tub_concave(concave_drop, mold_height, mold_kicktail_length + tail_transition_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res, mold_offset, true).translate([-(mold_kicktail_length + tail_transition_length) / 2 - concave_length / 2, 0, 0]);
				}

				else {
					kicktail = make_mold_concave(concave_radius, mold_height, mold_kicktail_length + tail_transition_length, mold_width, flat_concave_length).translate([-(mold_kicktail_length + tail_transition_length) / 2 - concave_length / 2, 0, 0]);
				}
			}

			var mold;

			if (tub_concave == true) {
				mold = color([0.7, 0.7, 0.7], make_tub_concave(concave_drop, mold_height, concave_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res, mold_offset, true));
			}

			else {
				mold = color([0.7, 0.7, 0.7], make_mold_concave(concave_radius, mold_height, concave_length, mold_width, flat_concave_length));
			}

			mold = mold.union(color([.5, .5, .5], kicknose));
			mold = mold.union(color([.5, .5, .5], kicktail));

			if (concave_radius !== 0) {

				//BT edit 3/29: added "base drop" parameters

				var nose_transition

				if (kicknose_angle !== 0) {
					if (tub_concave == false) {
						nose_transition = make_mold_transition_section_offset(nose_transition_length, mold_height, slice_thickness, mold_width, min_radius - mold_offset, number_of_segments, model_res, nose_base_drop_original, mold_offset);
					}

					else {
						nose_transition = make_tub_transition_section_offset(nose_transition_length, thickness, slice_thickness, mold_width, width, tub_radius, number_of_segments, model_res, nose_base_drop_original, flat_width, concave_drop, mold_height, tub_res, mold_offset);
					}
				}

				//return nose_transition;
				var tail_transition

				if (kicktail_angle !== 0) {
					if (tub_concave == false) {
						tail_transition = mirror([1, 0, 0], make_mold_transition_section_offset(tail_transition_length, mold_height, slice_thickness, mold_width, min_radius - mold_offset, number_of_segments, model_res, tail_base_drop_original, mold_offset));
					}

					else {
						tail_transition = mirror([1, 0, 0], make_tub_transition_section_offset(tail_transition_length, thickness, slice_thickness, mold_width, width, tub_radius, number_of_segments, model_res, tail_base_drop_original, flat_width, concave_drop, mold_height, tub_res, mold_offset));
					}
				}

				if (kicknose_angle !== 0) {
					nose_transition = nose_transition.translate([concave_length / 2 + nose_transition_length, 0, 0]);
				}

				if (kicktail_angle !== 0) {
					tail_transition = tail_transition.translate([-concave_length / 2 - tail_transition_length, 0, 0]);
				}
			}

			//	if (kick_concave == false) {
			if (nose_transition && tail_transition) {
				mold = [mold, nose_transition, tail_transition];
			}
			else if (nose_transition && (!tail_transition)) {
				mold = [mold, nose_transition];

			}
			else if (tail_transition && (!nose_transition)) {
				mold = [mold, tail_transition];
			}

			else {
				mold = [mold];
			}

			var block = cube({ size: [mold_length, mold_width, mold_height], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, -mold_height / 2]);
			//return block.intersect(mold[3]);

			for (let i = 0; i < mold.length; i++) {
				mold = block.intersect(mold[i]);

			}
			//	}
			if (nose_transition) { mold = mold.union(nose_transition) };
			if (tail_transition) { mold = mold.union(tail_transition) };

			var edge_eraser_left;
			var edge_eraser_right;

			var left_bounds = mold.getBounds()[0].x;
			var right_bounds = mold.getBounds()[1].x;

			edge_eraser_left = cube({ size: [mold_length, mold_width, mold_height + 3], center: true }).translate([0, -mold_width, -mold_height / 2]);

			mold = mold.subtract(edge_eraser_left);

			edge_eraser_right = cube({ size: [mold_length, mold_width, mold_height + 3], center: true }).translate([0, mold_width, -mold_height / 2]);

			mold = mold.subtract(edge_eraser_right);



			if (display == '2') {
				mold = (cube({ size: [mold_length, mold_width, actual_cav_height + 1], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, -actual_cav_height / 2 + 0.5])).subtract(mold);


				mold = mold.union(cube({ size: [mold_length, mold_width, actual_cav_height - 0.5], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, actual_cav_height / 2 + 0.25]));


				max_cav_height = mold.getBounds()[1].z - mold.getBounds()[0].z;

				low_point = mold.getBounds()[0].z; //peak of kicks on female mold
				new_cav_base = low_point + actual_cav_height;

				mold = mold.subtract(cube({ size: [mold_length, mold_width, max_cav_height], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, (new_cav_base + (max_cav_height / 2))]));

			}


			mold = mold.translate([0, 0, mold_offset]);

			skateboard = mold;


		}

		else {

			/*bt edits for troubleshooting
			var concave_drop = parameters.concave_drop;
			var tub = make_tub_concave(concave_drop, mold_height, concave_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res);
			
			return tub;
			*/



			if (kicknose_angle !== 0) {
				if (kick_concave == false) {
					kicknose = make_mold_kicknose_curve(kicknose_radius, mold_width, kicknose_angle, nose_transition_length, concave_length, kicknose_length);
				}
				else {
					kicknose = make_concave_kick(mold_width, kicknose_radius, kicknose_angle, nose_base_drop, nose_edge_kick_rad, nose_edge_kick_angle, mold_kicknose_length, mold_height, kcRes, nose_base_drop);

					kicknose = mirror([0, 0, 1], kicknose);
					kicknose = rotate([0, 0, -90], (kicknose.translate([0, kick_to_kick / 2, 0])));

				}
			}

			else {
				if (tub_concave == true) {
					kicknose = make_tub_concave(concave_drop, mold_height, mold_kicknose_length + nose_transition_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res, mold_offset, false).translate([(mold_kicknose_length + nose_transition_length) / 2 + concave_length / 2, 0, 0]);
				}
				else {
					kicknose = make_mold_concave(concave_radius, mold_height, mold_kicknose_length + nose_transition_length, mold_width, flat_concave_length).translate([(mold_kicknose_length + nose_transition_length) / 2 + concave_length / 2, 0, 0]);
				}
			}

			if (kicktail_angle !== 0) {
				if (kick_concave == false) {
					kicktail = make_mold_kicktail_curve(kicktail_radius, mold_width, kicktail_angle, tail_transition_length, concave_length, kicktail_length);
				}
				else {
					kicktail = make_concave_kick(mold_width, kicktail_radius, kicktail_angle, tail_base_drop, tail_edge_kick_rad, tail_edge_kick_angle, mold_kicktail_length, mold_height, kcRes, tail_base_drop);

					kicktail = mirror([0, 0, 1], kicktail);
					kicktail = rotate([0, 0, 90], (kicktail.translate([0, kick_to_kick / 2, 0])));

				}
			}

			else {
				if (tub_concave == true) {
					kicktail = make_tub_concave(concave_drop, mold_height, mold_kicktail_length + tail_transition_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res, mold_offset, false).translate([-(mold_kicktail_length + tail_transition_length) / 2 - concave_length / 2, 0, 0]);
				}

				else {
					kicktail = make_mold_concave(concave_radius, mold_height, mold_kicktail_length + tail_transition_length, mold_width, flat_concave_length).translate([-(mold_kicktail_length + tail_transition_length) / 2 - concave_length / 2, 0, 0]);
				}
			}


			var mold;
			if (tub_concave == true) {
				mold = color([0.7, 0.7, 0.7], make_tub_concave(concave_drop, mold_height, concave_length, mold_width, flat_concave_length, flat_width, tub_radius, width, tub_res, mold_offset, false));
			}
			else {
				mold = color([0.7, 0.7, 0.7], make_mold_concave(concave_radius, mold_height, concave_length, mold_width, flat_concave_length));
			}

			mold = mold.union(color([.5, .5, .5], kicknose));
			mold = mold.union(color([.5, .5, .5], kicktail));

			if (concave_radius !== 0) {

				var nose_transition

				if (kicknose_angle !== 0) {
					if (tub_concave == false && kicknose) {
						nose_transition = make_mold_transition_section_new(nose_transition_length, mold_height, slice_thickness, mold_width, min_radius, number_of_segments, model_res, nose_base_drop);
					}

					else {
						nose_transition = make_tub_transition_section(nose_transition_length, thickness, slice_thickness, mold_width, width, tub_radius, number_of_segments, model_res, nose_base_drop, flat_width, concave_drop, mold_height, tub_res);
					}
				}
				var tail_transition

				if (kicktail_angle !== 0) {
					if (tub_concave == false) {
						tail_transition = mirror([1, 0, 0], make_mold_transition_section_new(tail_transition_length, mold_height, slice_thickness, mold_width, min_radius, number_of_segments, model_res, tail_base_drop));
					}

					else {
						tail_transition = mirror([1, 0, 0], make_tub_transition_section(tail_transition_length, thickness, slice_thickness, mold_width, width, tub_radius, number_of_segments, model_res, tail_base_drop, flat_width, concave_drop, mold_height, tub_res));
					}
				}
				if (kicknose_angle !== 0) {
					nose_transition = nose_transition.translate([concave_length / 2 + nose_transition_length, 0, 0]);
				}

				if (kicktail_angle !== 0) {
					tail_transition = tail_transition.translate([-concave_length / 2 - tail_transition_length, 0, 0]);
				}

			}


			//if (kick_concave==false) {
			if (nose_transition && tail_transition) {
				mold = [mold, nose_transition, tail_transition]; //removed kicknose and kicktail from all of these 6/7/22
			}
			else if (nose_transition && (!tail_transition)) {
				mold = [mold, nose_transition];

			}
			else if (tail_transition && (!nose_transition)) {
				mold = [mold, tail_transition];
			}

			else {
				mold = [mold];
			}


			var block = cube({ size: [mold_length, mold_width, mold_height], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, -mold_height / 2]);
			//return block.intersect(mold[3]);

			for (let i = 0; i < mold.length; i++) {
				mold = block.intersect(mold[i]);

			}
			//}
			if (nose_transition) { mold = mold.union(nose_transition) };
			if (tail_transition) { mold = mold.union(tail_transition) };


			if (display == '3') {
				mold = (cube({ size: [mold_length, mold_width, actual_cav_height], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, -(actual_cav_height) / 2])).subtract(mold);

				mold = mold.union((cube({ size: [mold_length, mold_width, actual_cav_height], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, (actual_cav_height / 2)])));

				max_cav_height = mold.getBounds()[1].z - mold.getBounds()[0].z;

				low_point = mold.getBounds()[0].z; //peak of kicks on female mold
				new_cav_base = low_point + actual_cav_height;

				mold = mold.subtract(cube({ size: [mold_length, mold_width, max_cav_height], center: true }).translate([(nose_transition_length - tail_transition_length + nose_length - tail_length) / 2, 0, (new_cav_base + (max_cav_height / 2))]));
			}


			skateboard = mold;

		}



		var mDia = notch_diameter; //notch diameter


		if (display == '1' || display == '3') {
			if (make_notches == true) {

				var notches = make_markers(mold_width, wheelbase, nose_length, tail_length, bolt_pattern_length, mDia, kick_gap, nose_transition_length, tail_transition_length, nose_base_drop, tail_base_drop);


				skateboard = skateboard.subtract(notches);


			}
			skateboard = color([0, 0.99, 0], skateboard);

		}

		if (display == '2' || display == '4') {
			if (make_notches == true) {
				skateboard = skateboard.subtract(make_markers(mold_width, wheelbase, nose_length, tail_length, bolt_pattern_length, mDia, kick_gap, nose_transition_length, tail_transition_length, nose_base_drop, tail_base_drop).translate([0, 0, mold_offset]));
			}
			skateboard = color([0, 0.5, 0.99], skateboard);

		}


		var hole_depth;

		if (display == '0' || showProfile == true) {
			hole_depth = 6;
			skateboard = skateboard.subtract(make_wheelbase(bolt_pattern_length, bolt_pattern_width, wheelbase, hole_depth, truck_hole_diameter));
			skateboard = color([0, 0.99, 0.99], skateboard);
		}

		else if ((display !== '0') && (mold_holes == true)) {
			hole_depth = 3 * (mold_height + mold_offset + min_cavity_height);
			skateboard = skateboard.subtract(make_wheelbase(bolt_pattern_length, bolt_pattern_width, wheelbase, hole_depth, truck_hole_diameter).translate([0, 0, -3 * (mold_height + mold_offset + min_cavity_height) / 2]));
		}

		//skateboard = color([0,0.99,0],skateboard);

		var printLength = parameters.print_length;
		var printWidth = parameters.print_width;

		var sectionWidth;

		if (printWidth >= mold_width) {
			sectionWidth = mold_width;
			sectionWidthMoveX = 0;
		}

		else {
			sectionWidth = printWidth;
			sectionWidthMoveX = sectionWidth / 2;
		}

		skateboard = doPrintSections(skateboard, display, mold_length, mold_height, mold_offset, min_cavity_height, printSection, printLength, sectionWidth, nose_length, tail_length, sectionWidthMoveX);

		//console.log('bounds are ' + (skateboard.getBounds()[1].z - skateboard.getBounds()[0].z))


		if (make_bores == true) {

			var bore_oversize = 0.1; //how much longer to make the bore for cleaner cuts

			if (display == '1' || display == '2') {
				var bores = make_section_bores(mold_width, mold_length, printLength, printWidth, bore_dia, bore_depth, mold_height, printSection, bore_spacing, nose_length, tail_length, display, bore_oversize);


				var numberOfBores = bores.length;

				if (display == '2') {
					for (var i = 0; i < numberOfBores; i++) {
						bores[i] = bores[i].translate([0, 0, mold_height + skateboard.getBounds()[1].z - bore_depth + bore_oversize]);
					}

				}


				if (printSection == 'NONE') {
					var verticalPlane = CSG.Plane.fromPoints([0, 0, 0], [5, 0, 1], [-5, 0, 1]);
					for (var k = 0; k < bores.length; k++) {
						skateboard = skateboard.subtract(bores[k].mirrored(verticalPlane));
					}
				}



				skateboard = skateboard.subtract(bores);
			}
		}

		if (make_mold_zipties == true) {
			skateboard = doZipties(skateboard, display, nose_length, tail_length, mold_length, mold_width, mold_height, printLength, printSection, nose_nose_male_ziptie, anose_nose_male_ziptie, center_male_ziptie, atail_tail_male_ziptie, tail_tail_male_ziptie, nose_nose_female_ziptie, anose_nose_female_ziptie, center_female_ziptie, atail_tail_female_ziptie, tail_tail_female_ziptie);
		}

		if (export_in_mm == true) {
			skateboard = skateboard.scale(25.4);
		}

		modelArray.push(color([0.9, 0.95, 0.95], skateboard));

		if (display == '2') {
			if (boardDisplay == true) {
				var profile;
		
				var extrusion_height;
				var extrusion_adjust = 0.1;
		
				var lower_bound = modelArray[0].getBounds()[0].z;
				var upper_bound = modelArray[1].getBounds()[1].z;
		
				var mold_height_delta = upper_bound - lower_bound;
		
				extrusion_height = mold_height_delta;
				extrusion_height -= extrusion_adjust; //to prevent adjacent faces
		
				if (make_cutouts == false) {
					profile = make_profile(width, wheelbase, bolt_pattern_length, nose_length, tail_length, length, taperN, taperT, nose_shape, tail_shape, extrusion_height);
				}
		
				else {
					profile = make_lb_profile(width, wheelbase, bolt_pattern_length, nose_length, tail_length, length, taperN, taperT, extrusion_height, noseLipX, noseLipY, noseY, tailLipX, tailLipY, tailY)
				}
				profile = profile.translate([0, 0, -mold_height + (extrusion_adjust / 2)]);
				profile = profile.subtract(modelArray[0]);
		
				if (router_template == false) {
					profile = profile.subtract(modelArray[1]);
				}
		
				hole_depth = 6;
				profile = profile.subtract(make_wheelbase(bolt_pattern_length, bolt_pattern_width, wheelbase, hole_depth, truck_hole_diameter).translate([0, 0, -hole_depth / 2]));
				profile = color([0, 0.99, 0.99], profile);

				profile = doPrintSections(profile, display, mold_length, mold_height, mold_offset, min_cavity_height, printSection, printLength, sectionWidth, nose_length, tail_length, sectionWidthMoveX);
				profile = doZipties(profile, display, nose_length, tail_length, mold_length, mold_width, mold_height, printLength, printSection, nose_nose_male_ziptie, anose_nose_male_ziptie, center_male_ziptie, atail_tail_male_ziptie, tail_tail_male_ziptie, nose_nose_female_ziptie, anose_nose_female_ziptie, center_female_ziptie, atail_tail_female_ziptie, tail_tail_female_ziptie);
				
				modelArray = [profile];
			}
		}
	}

	if (make_contours == true) {
		var top_bound, bottom_bound;

		for (var i = 0; i < modelArray.length; i++) {
			if ((modelArray[i - 1] == null) || (modelArray[i].getBounds()[1].z > modelArray[i - 1].getBounds()[1].z)) {
				top_bound = modelArray[i].getBounds()[1].z;
			}
			if ((modelArray[i - 1] == null) || (modelArray[i].getBounds()[0].z < modelArray[i - 1].getBounds()[0].z)) {
				bottom_bound = modelArray[i].getBounds()[0].z;
			}

		}

		var topoStack = topoLayers(mold_length + 1, mold_width + 1, contour_res, bottom_bound, top_bound, mold_height);
		//return skateboard;
		var stackArray = []

		for (var j = 0; j < topoStack.length; j++) {
			for (var k = 0; k < modelArray.length; k++) {
				if (j % 2 == 0) {
					stackArray.push(color([0, 0.9, 0.99], modelArray[k].intersect(topoStack[j])));
				}
				else {
					stackArray.push(color([0.9, 0.95, 0.99], modelArray[k].intersect(topoStack[j])));
				}
			}

		}

		modelArray = stackArray;
	}

	return modelArray;
	//return color([0.9,0.95,0.95],skateboard);

}

function doPrintSections (skateboard, display, mold_length, mold_height, mold_offset, min_cavity_height, printSection, printLength, sectionWidth, nose_length, tail_length, sectionWidthMoveX) {
	if (display == '2' || display == '4') {
		var sectionHeight = 2 * (mold_height + (mold_offset) + min_cavity_height);
		switch (printSection) {
			case 'C':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([(nose_length - tail_length) / 2, sectionWidthMoveX, 0]));
				break;
			case '1N':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, 0]));
				break;
			case '1T':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([-printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, 0]));
				break;
			case '2N':
				// make arg for boards that go into 3n & 3t
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [(mold_length - printLength * 3) / 2, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([((printLength + (mold_length - printLength * 3) / 2) + (nose_length - tail_length) / 2), sectionWidthMoveX, 0]));
				break;
			case '2T':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [(mold_length - printLength * 3) / 2, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([(-(printLength + (mold_length - printLength * 3) / 2) + (nose_length - tail_length) / 2), sectionWidthMoveX, 0]));
				break;
			case '3N':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([3 * printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, 0]));
				break;
			case '3T':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, sectionHeight], radius: [0.2, 0.2, 0.2], center: true, fn: 32 })).translate([-3 * printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, 0]));
				break;
			case 'NONE':
				break;
		}
	} else {
		//max mold size: 16" x 48" using 8" x 8" print area.
		switch (printSection) {
			case 'C':
				skateboard = skateboard.intersect(color([0.99, 0, 0], intersection(cube({ size: [printLength, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 }).translate([(nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2]), cube({ size: [printLength, sectionWidth, mold_height], center: true, fn: 32 }).translate([(nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2 + 0.3 / 25.4]))));
				break;
			case '1N':
				skateboard = skateboard.intersect(color([0.99, 0, 0], intersection(cube({ size: [printLength, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 }).translate([printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2]), cube({ size: [printLength, sectionWidth, mold_height], center: true, fn: 32 }).translate([printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2 + 0.3 / 25.4]))));
				break;
			case '1T':
				skateboard = skateboard.intersect(color([0.99, 0, 0], intersection(cube({ size: [printLength, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 }).translate([-printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2]), cube({ size: [printLength, sectionWidth, mold_height], center: true, fn: 32 }).translate([-printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2 + 0.3 / 25.4]))));
				break;
			case '2N':
				// make arg for boards that go into 3n & 3t
				skateboard = skateboard.intersect(color([0.99, 0, 0], intersection(cube({ size: [(mold_length - printLength * 3) / 2, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 }).translate([((printLength + (mold_length - printLength * 3) / 2) + (nose_length - tail_length) / 2), sectionWidthMoveX, -mold_height / 2]), cube({ size: [(mold_length - printLength * 3) / 2, sectionWidth, mold_height], center: true, fn: 32 }).translate([((printLength + (mold_length - printLength * 3) / 2) + (nose_length - tail_length) / 2), sectionWidthMoveX, -mold_height / 2 + 0.3 / 25.4]))));
				break;
			case '2T':
				skateboard = skateboard.intersect(color([0.99, 0, 0], intersection(cube({ size: [(mold_length - printLength * 3) / 2, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 }).translate([(-(printLength + (mold_length - printLength * 3) / 2) + (nose_length - tail_length) / 2), sectionWidthMoveX, -mold_height / 2]), cube({ size: [(mold_length - printLength * 3) / 2, sectionWidth, mold_height], center: true, fn: 32 }).translate([(-(printLength + (mold_length - printLength * 3) / 2) + (nose_length - tail_length) / 2), sectionWidthMoveX, -mold_height / 2 + 0.3 / 25.4]))));
				break;
			case '3N':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 })).translate([3 * printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2]));
				break;
			case '3T':
				skateboard = skateboard.intersect(color([0.99, 0, 0], cube({ size: [printLength, sectionWidth, mold_height], radius: [0.2, 0.2, 0], center: true, fn: 32 })).translate([-3 * printLength + (nose_length - tail_length) / 2, sectionWidthMoveX, -mold_height / 2]));
				break;
			case 'NONE':
				break;
		}
	}

	return skateboard;
}

function doZipties(skateboard, display, nose_length, tail_length, mold_length, mold_width, mold_height, printLength, printSection, nose_nose_male_ziptie, anose_nose_male_ziptie, center_male_ziptie, atail_tail_male_ziptie, tail_tail_male_ziptie, nose_nose_female_ziptie, anose_nose_female_ziptie, center_female_ziptie, atail_tail_female_ziptie, tail_tail_female_ziptie) {
	//var ziptie_height = 4.8/25.4;
	var ziptie_height = 5.7 / 25.4;
	var ziptie_width = 2 / 25.4;
	var ziptie_offest = 5 / 25.4;
	var ziptie_clearance = 0.6 / 25.4;

	var outerDiameter = (ziptie_width + ziptie_offest) * 2;
	var innerDiameter = ziptie_offest * 2;

	var wall_width = 1 / 25.4;
	var slice = 0.3 / 25.4;

	var alignmentHoleDiameter = 7 / 25.4;
	var alignmentHoleDistance = 100 / 25.4;
	var alignmentNutSize = 0;

	if (display == '1' || display == '2') {
		var verticalPlane = CSG.Plane.fromPoints([0, 0, 0], [5, 0, 1], [-5, 0, 1]);

		var ziptie_array = [];

		if (display == '1') {
			// nose to nose
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: nose_nose_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), 0, -mold_height + nose_nose_male_ziptie / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: nose_nose_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), 0, -mold_height + nose_nose_male_ziptie / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (nose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width / 2, 0, -mold_height + ((nose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (nose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width / 2, 0, -mold_height + nose_nose_male_ziptie - ((nose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((nose_nose_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width / 2, 0, -mold_height + ((nose_nose_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((nose_nose_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (nose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), wall_width / 2, -mold_height + ((nose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (nose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), wall_width / 2, -mold_height + nose_nose_male_ziptie - ((nose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((nose_nose_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), wall_width / 2, -mold_height + ((nose_nose_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((nose_nose_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: alignmentHoleDiameter/2, h: wall_width, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width/2, alignmentHoleDistance/2, -mold_height + 7.72441/25.4]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - (wall_width+alignmentNutSize)/2, alignmentHoleDistance/2, -mold_height + alignmentNutSize/2]));


			// anose to nose
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: anose_nose_male_ziptie, center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), mold_width / 2, -mold_height + anose_nose_male_ziptie / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: anose_nose_male_ziptie, center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), mold_width / 2, -mold_height + anose_nose_male_ziptie / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (anose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + ((anose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (anose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + anose_nose_male_ziptie - ((anose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((anose_nose_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + ((anose_nose_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((anose_nose_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + ((anose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + anose_nose_male_ziptie - ((anose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((anose_nose_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + ((anose_nose_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((anose_nose_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// nose
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + ((anose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + anose_nose_male_ziptie - ((anose_nose_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((anose_nose_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + ((anose_nose_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((anose_nose_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height + innerDiameter / 4]));


			// center
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: center_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (printLength / 2), mold_width / 2, -mold_height + center_male_ziptie / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: center_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (printLength / 2), mold_width / 2, -mold_height + center_male_ziptie / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + center_male_ziptie - ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((center_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((center_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + center_male_ziptie - ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((center_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// anose
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + center_male_ziptie - ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((center_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: center_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength - (printLength / 2)), mold_width / 2, -mold_height + center_male_ziptie / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: center_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength - (printLength / 2)), mold_width / 2, -mold_height + center_male_ziptie / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + center_male_ziptie - ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((center_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((center_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + center_male_ziptie - ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((center_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// atail
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + center_male_ziptie - ((center_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, -mold_height + ((center_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((center_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, -mold_height + innerDiameter / 4]));


			// atail to tail
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: atail_tail_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), mold_width / 2, -mold_height + atail_tail_male_ziptie / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: atail_tail_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), mold_width / 2, -mold_height + atail_tail_male_ziptie / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (atail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), (mold_width - wall_width) / 2, -mold_height + ((atail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (atail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), (mold_width - wall_width) / 2, -mold_height + atail_tail_male_ziptie - ((atail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((atail_tail_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), (mold_width - wall_width) / 2, -mold_height + ((atail_tail_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((atail_tail_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + wall_width / 2, mold_width / 2, -mold_height + ((atail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + wall_width / 2, mold_width / 2, -mold_height + atail_tail_male_ziptie - ((atail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((atail_tail_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + wall_width / 2, mold_width / 2, -mold_height + ((atail_tail_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((atail_tail_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// tail
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - wall_width / 2, mold_width / 2, -mold_height + ((atail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - wall_width / 2, mold_width / 2, -mold_height + atail_tail_male_ziptie - ((atail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((atail_tail_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - wall_width / 2, mold_width / 2, -mold_height + ((atail_tail_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((atail_tail_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + ziptie_height / 2 + outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - ziptie_height / 2 - outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - ziptie_height / 2 - outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), ziptie_height / 2 + outerDiameter, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), ziptie_height / 2 + outerDiameter, -mold_height + innerDiameter / 4]));


			// tail to tail
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: tail_tail_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), 0, -mold_height + tail_tail_male_ziptie / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: tail_tail_male_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), 0, -mold_height + tail_tail_male_ziptie / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (tail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + wall_width / 2, 0, -mold_height + ((tail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (tail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + wall_width / 2, 0, -mold_height + tail_tail_male_ziptie - ((tail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((tail_tail_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + wall_width / 2, 0, -mold_height + ((tail_tail_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((tail_tail_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (tail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), wall_width / 2, -mold_height + ((tail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (tail_tail_male_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), wall_width / 2, -mold_height + tail_tail_male_ziptie - ((tail_tail_male_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((tail_tail_male_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), wall_width / 2, -mold_height + ((tail_tail_male_ziptie - ziptie_height * 2) / 5 + ziptie_height) + (((tail_tail_male_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + (outerDiameter / 2 + ziptie_clearance) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + (outerDiameter / 2 + ziptie_clearance) + ziptie_height / 2 + outerDiameter, 0, -mold_height]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + (outerDiameter / 2 + ziptie_clearance) + ziptie_height / 2 + outerDiameter, wall_width / 2, -mold_height + innerDiameter / 4]));
		} else {
			// nose to nose
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: nose_nose_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), 0, nose_nose_female_ziptie / 2 + skateboard.getBounds()[1].z - nose_nose_female_ziptie]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: nose_nose_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), 0, nose_nose_female_ziptie / 2 + skateboard.getBounds()[1].z - nose_nose_female_ziptie]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (nose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width / 2, 0, skateboard.getBounds()[1].z - ((nose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (nose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width / 2, 0, skateboard.getBounds()[1].z - nose_nose_female_ziptie + ((nose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((nose_nose_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - wall_width / 2, 0, skateboard.getBounds()[1].z - ((nose_nose_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((nose_nose_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (nose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), wall_width / 2, skateboard.getBounds()[1].z - ((nose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (nose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), wall_width / 2, skateboard.getBounds()[1].z - nose_nose_female_ziptie + ((nose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((nose_nose_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2), wall_width / 2, skateboard.getBounds()[1].z - ((nose_nose_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((nose_nose_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 + (mold_length / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));


			// anose to nose
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: anose_nose_female_ziptie, center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), mold_width / 2, anose_nose_female_ziptie / 2 + skateboard.getBounds()[1].z - anose_nose_female_ziptie]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: anose_nose_female_ziptie, center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), mold_width / 2, anose_nose_female_ziptie / 2 + skateboard.getBounds()[1].z - anose_nose_female_ziptie]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (anose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((anose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (anose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - anose_nose_female_ziptie + ((anose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((anose_nose_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((anose_nose_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((anose_nose_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((anose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - anose_nose_female_ziptie + ((anose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((anose_nose_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((anose_nose_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((anose_nose_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// nose
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((anose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (anose_nose_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - anose_nose_female_ziptie + ((anose_nose_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((anose_nose_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((anose_nose_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((anose_nose_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([2 * printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z - innerDiameter / 4]));


			// center
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: center_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (printLength / 2), mold_width / 2, center_female_ziptie / 2 + skateboard.getBounds()[1].z - center_female_ziptie]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: center_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 + (printLength / 2), mold_width / 2, center_female_ziptie / 2 + skateboard.getBounds()[1].z - center_female_ziptie]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - center_female_ziptie + ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((center_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((center_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - center_female_ziptie + ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((center_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// anose
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - center_female_ziptie + ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((center_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: center_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength - (printLength / 2)), mold_width / 2, center_female_ziptie / 2 + skateboard.getBounds()[1].z - center_female_ziptie]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: center_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength - (printLength / 2)), mold_width / 2, center_female_ziptie / 2 + skateboard.getBounds()[1].z - center_female_ziptie]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - center_female_ziptie + ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((center_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((center_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - center_female_ziptie + ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((center_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// atail
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (center_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - center_female_ziptie + ((center_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((center_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((center_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((center_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2) + ziptie_height / 2 + outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2) - ziptie_height / 2 - outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([printLength + (nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength / 2), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z - innerDiameter / 4]));


			// atail to tail
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: atail_tail_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), mold_width / 2, atail_tail_female_ziptie / 2 + skateboard.getBounds()[1].z - atail_tail_female_ziptie]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: atail_tail_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), mold_width / 2, atail_tail_female_ziptie / 2 + skateboard.getBounds()[1].z - atail_tail_female_ziptie]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (atail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((atail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (atail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - atail_tail_female_ziptie + ((atail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((atail_tail_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), (mold_width - wall_width) / 2, skateboard.getBounds()[1].z - ((atail_tail_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((atail_tail_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((atail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - atail_tail_female_ziptie + ((atail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((atail_tail_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((atail_tail_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((atail_tail_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			// tail
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((atail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (atail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - atail_tail_female_ziptie + ((atail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((atail_tail_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - wall_width / 2, mold_width / 2, skateboard.getBounds()[1].z - ((atail_tail_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((atail_tail_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) + ziptie_height / 2 + outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - ziptie_height / 2 - outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)) - ziptie_height / 2 - outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateX(90).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width * 2, ziptie_height, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (printLength + (printLength / 2)), ziptie_height / 2 + outerDiameter, skateboard.getBounds()[1].z - innerDiameter / 4]));

			// tail to tail
			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: tail_tail_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), 0, tail_tail_female_ziptie / 2 + skateboard.getBounds()[1].z - tail_tail_female_ziptie]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: tail_tail_female_ziptie, center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), 0, tail_tail_female_ziptie / 2 + skateboard.getBounds()[1].z - tail_tail_female_ziptie]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (tail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + wall_width / 2, 0, skateboard.getBounds()[1].z - ((tail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, (tail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + wall_width / 2, 0, skateboard.getBounds()[1].z - tail_tail_female_ziptie + ((tail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [wall_width, outerDiameter + ziptie_clearance * 2, ((tail_tail_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + wall_width / 2, 0, skateboard.getBounds()[1].z - ((tail_tail_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((tail_tail_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (tail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), wall_width / 2, skateboard.getBounds()[1].z - ((tail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, (tail_tail_female_ziptie - ziptie_height * 2) / 5], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), wall_width / 2, skateboard.getBounds()[1].z - tail_tail_female_ziptie + ((tail_tail_female_ziptie - ziptie_height * 2) / 5) / 2]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [outerDiameter + ziptie_clearance * 2, wall_width, ((tail_tail_female_ziptie - ziptie_height * 2) / 5) * 3], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2), wall_width / 2, skateboard.getBounds()[1].z - ((tail_tail_female_ziptie - ziptie_height * 2) / 5 + ziptie_height) - (((tail_tail_female_ziptie - ziptie_height * 2) / 5) * 3) / 2]));

			ziptie_array.push(cylinder({ r: (outerDiameter / 2 + ziptie_clearance), h: ziptie_height, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + (outerDiameter / 2 + ziptie_clearance) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cylinder({ r: innerDiameter / 2, h: ziptie_height - slice, center: true }).rotateY(90).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + (outerDiameter / 2 + ziptie_clearance) + ziptie_height / 2 + outerDiameter, 0, skateboard.getBounds()[1].z]));
			ziptie_array[ziptie_array.length - 1] = ziptie_array[ziptie_array.length - 1].subtract(cube({ size: [ziptie_height, wall_width, innerDiameter / 2], center: true }).translate([(nose_length - tail_length) / 2 - (mold_length / 2) + (outerDiameter / 2 + ziptie_clearance) + ziptie_height / 2 + outerDiameter, wall_width / 2, skateboard.getBounds()[1].z - innerDiameter / 4]));
		}

		for (var i = 0; i < ziptie_array.length; i++) {
			skateboard = skateboard.subtract(ziptie_array[i]);
			if (printSection == 'NONE') {
				skateboard = skateboard.subtract(ziptie_array[i].mirrored(verticalPlane));
			}
		}
	}

	return skateboard;
}

function make_origin(origin) {
	var result = new CSG();
	var height = 20;
	result = union(
		cylinder({ d: 0.25, h: height, center: true }).translate([0, 0, height / 2]),
		union(
			rotate([-90, 0, 0], cylinder({ d: 0.25, h: height, center: true }).translate([0, 0, height / 2])),
			rotate([0, 90, 0], cylinder({ d: 0.25, h: height, center: true }).translate([0, 0, height / 2]))
		)
	);
	return result;
}

function make_markers(width, wheelbase, nose_length, tail_length, boltL, mDia, kick_gap, noseT, tailT, nose_base_drop, tail_base_drop) {
	var result = new CSG();
	result = sphere({ r: mDia / 2, center: true });

	result = result.translate([(wheelbase / 2 + boltL + kick_gap + ((noseT - tailT) / 2)), (width / 2), -nose_base_drop]);

	result = result.union(sphere({ r: mDia / 2, center: true }).translate([(wheelbase / 2 + boltL + kick_gap + ((noseT - tailT) / 2)), -(width / 2), -nose_base_drop]));

	result = result.union(sphere({ r: mDia / 2, center: true }).translate([-(wheelbase / 2 + boltL + kick_gap - ((noseT - tailT) / 2)), -(width / 2), -tail_base_drop]));

	result = result.union(sphere({ r: mDia / 2, center: true }).translate([-(wheelbase / 2 + boltL + kick_gap - ((noseT - tailT) / 2)), (width / 2), -tail_base_drop]));


	return result;


}


function topoLayers(length, width, thick, bottom_bound, top_bound, moldHeight) {
	var result = [];

	var height = top_bound - bottom_bound;

	var iSteps = height / thick;

	for (var i = 0; i <= iSteps + 1; i++) {
		if (i % 2 == 0) {
			result.push(color([0, 0.9, 0.99], cube({ size: [length, width, thick], center: true })).translate([0, 0, i * thick + (bottom_bound)]));
		}
		else {
			result.push(color([.95, 0.95, 0.99], cube({ size: [length, width, thick], center: true })).translate([0, 0, i * thick + (bottom_bound)]));
		}
	}

	return result;
}


function make_bolt_pattern(bolt_pattern_length, bolt_pattern_width, depth, truck_hole_diameter) {
	var result = new CSG();

	result = (cylinder({ d: truck_hole_diameter, h: depth, center: false }).translate([bolt_pattern_length / 2, bolt_pattern_width / 2, 0])).union(cylinder({ d: truck_hole_diameter, h: depth, center: false }).translate([bolt_pattern_length / 2, -bolt_pattern_width / 2, 0]));
	result = result.union(cylinder({ d: truck_hole_diameter, h: depth, center: false }).translate([-bolt_pattern_length / 2, -bolt_pattern_width / 2, 0]));
	result = result.union(cylinder({ d: truck_hole_diameter, h: depth, center: false }).translate([-bolt_pattern_length / 2, bolt_pattern_width / 2, 0]));

	return result;
}

function make_wheelbase(bolt_pattern_length, bolt_pattern_width, wheelbase, depth, truck_hole_diameter) {
	var result = new CSG();

	result = (make_bolt_pattern(bolt_pattern_length, bolt_pattern_width, depth, truck_hole_diameter).translate([(wheelbase / 2) + (bolt_pattern_length / 2), 0, -1])).union(make_bolt_pattern(bolt_pattern_length, bolt_pattern_width, depth, truck_hole_diameter).translate([-((wheelbase / 2) + (bolt_pattern_length / 2)), 0, -1]));
	return result;
}

function make_concave(concave_radius, thickness, concave_length, width, flat_concave_length) {
	var result = new CSG();

	if (concave_radius == 0) {
		result = cube({ size: [flat_concave_length, width, thickness] });
		result = result.translate([-flat_concave_length / 2, -width / 2, -thickness]);
		return result;
	}

	else {

		result =
			difference(
				difference(
					difference(
						(rotate([90, 0, 90], difference(
							cylinder({ r: (concave_radius + thickness), h: concave_length, center: true, fn: 500 }),
							cylinder({ r: concave_radius, h: concave_length + 2, center: true, fn: 500 }).translate([0, 0, 1])))
						).translate([-concave_length / 2, 0, concave_radius]),

						cube({ size: [concave_length * 2, concave_radius * 4, concave_radius * 4] }).translate([-concave_length, -concave_radius * 2 + 10, concave_radius])
					),
					cube({ size: [concave_length * 4, concave_radius * 2, concave_radius * 2], center: false }).translate([-concave_length * 2, width / 2, 0])
				),
				mirror([0, 1, 0], cube({ size: [concave_length * 4, concave_radius * 2, concave_radius * 2], center: false }).translate([-concave_length * 2, width / 2, 0]))
			);
		return result.translate([concave_length / 2, 0, 0]);
	}

}

function make_mold_concave(concave_radius, thickness, concave_length, width, flat_concave_length) {
	var result = new CSG();
	if (concave_radius == 0) {
		result = cube({ size: [flat_concave_length, width, thickness] });
		result = result.translate([-flat_concave_length / 2, -width / 2, -thickness]);
		return result;
	}

	else {

		result = rotate([90, 0, 90], cylinder({ r: concave_radius, h: concave_length, center: true, fn: 500 })).translate([0, 0, -concave_radius]);


		return result;

	}
}


function make_tub_concave(concave_drop, thickness, concave_length, mold_width, flat_concave_length, flat_width, tub_rad, deck_width, tub_res, mold_offset, isOffset) {
	var res = 100; //resolution of bezier curves

	var x_res = tub_res;

	/*The following equations were derived on a piece of paper, using tan(tub_angle) = (concave_drop - tub_rad + tub_rad*cos(tub_angle))/(deck_width/2 - flat_width/2 - tub_rad*sin(tub_angle)) and some trig identities: sin^2(x) + cos^2(x) = 1. This website was helpful: https://www.symbolab.com/solver/trigonometric-simplification-calculator
	*/

	var a = Math.pow(concave_drop - tub_rad, 2) + Math.pow((deck_width / 2 - flat_width / 2), 2);

	var b = 2 * tub_rad * (concave_drop - tub_rad);

	var c = Math.pow(tub_rad, 2) - Math.pow(deck_width / 2 - flat_width / 2, 2);

	var tub_angle1 = acos((-b + sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a));
	//var tub_angle2 = acos((-b - sqrt(Math.pow(b,2) - 4*a*c))/(2*a));

	var tub_angle = tub_angle1;

	//update tub rad if female mold:
	if (isOffset) {
		tub_rad += mold_offset;
	}

	var x_adjust = Math.ceil((flat_width / 2) / x_res);

	var profile = new CSG.Path2D([
		[0, 0],
		[x_res * x_adjust, 0]
	]);

	var x;

	for (x = x_res; x <= mold_width / 2 - flat_width / 2; x += x_res) { //as we move from the flat section to mold edge
		if (x <= (tub_rad * sin(tub_angle))) {
			profile = profile.appendPoint([x + (x_res * x_adjust), -(tub_rad - sqrt((pow(tub_rad, 2) - pow((x), 2))))]);

		}

		else {
			profile = profile.appendPoint([x + (x_res * x_adjust), -((tub_rad - (tub_rad * cos(tub_angle))) + (((x) - tub_rad * sin(tub_angle)) * tan(tub_angle)))]);
		}
		//console.log(profile);
	}

	profile = profile.appendPoints([
		[x - x_res + (x_res * x_adjust), -thickness],
		[0, -thickness]
	]);

	profile = profile.close();

	var result = profile.innerToCAG();
	result = linear_extrude({ height: concave_length }, result);

	result = result.union(mirror([1, 0, 0], result));


	result = rotate([90, 0, 90], result);

	return result.translate([-concave_length / 2, 0, 0]);

}

function make_kicknose_curve(kicknose_radius, thickness, width, kicknose_angle, nose_transition_length, concave_length) {
	var result = new CSG();
	result =
		difference(
			difference(
				rotate([90, 0, 90], difference(
					cylinder({ r: kicknose_radius + thickness, h: width, center: false, fn: 100 }),
					cylinder({ r: kicknose_radius, h: width + 2, center: false, fn: 100 }).translate([0, 0, -1])
				)),
				rotate([0, 0, 90], cube({ size: [kicknose_radius * 2, width * 4, kicknose_radius * 4], center: false }).translate([-kicknose_radius * 2, -width * 2, -kicknose_radius - 2])
				)),
			mirror([1, 0, 0], rotate([0, kicknose_angle, -90], cube({ size: [kicknose_radius * 2, width * 4, kicknose_radius * 4], center: false }).translate([-kicknose_radius * 2, -width * 2, -kicknose_radius * 2])))
		).translate([0, 0, kicknose_radius + thickness]);

	result = rotate([0, 0, -90], (result.translate([-width / 2, 0, 0])));
	result = result.translate([concave_length / 2 + nose_transition_length, 0, 0]);

	return result;
}

function make_kicktail_curve(kicktail_radius, thickness, width, kicktail_angle, tail_transition_length, concave_length) {

	var result = new CSG();
	result =
		mirror([0, 1, 0],
			difference(
				difference(
					rotate([90, 0, 90], difference(
						cylinder({ r: kicktail_radius + thickness, h: width, center: false, fn: 100 }),
						cylinder({ r: kicktail_radius, h: width + 2, center: false, fn: 100 }).translate([0, 0, -1])
					)),
					rotate([0, 0, 90], cube({ size: [kicktail_radius * 2, width * 4, kicktail_radius * 4], center: false }).translate([-kicktail_radius * 2, -width * 2, -kicktail_radius - 2])
					)),
				mirror([1, 0, 0], rotate([0, kicktail_angle, -90], cube({ size: [kicktail_radius * 2, width * 4, kicktail_radius * 4], center: false }).translate([-kicktail_radius * 2, -width * 2, -kicktail_radius * 2])))
			).translate([0, 0, kicktail_radius + thickness])

		);
	result = rotate([0, 0, -90], (result.translate([-width / 2, 0, 0])));
	result = result.translate([-concave_length / 2 - tail_transition_length, 0, 0]);

	return result;
}

function make_mold_kicknose_curve(kicknose_radius, width, kicknose_angle, nose_transition_length, concave_length, kicknose_length) {
	var result = new CSG();

	result = rotate([90, 0, 0], cylinder({ r: kicknose_radius, h: width, center: false, fn: 500 }));

	result = difference(result, cube({ size: [kicknose_radius * 2, width * 4, kicknose_radius * 4] }).translate([-kicknose_radius * 2, -width * 2, -kicknose_radius - 2]))
	result = result.subtract((rotate([0, kicknose_angle, 0], cube({ size: [kicknose_length + kicknose_radius, width, kicknose_radius * 2], center: false }).translate([0, -width, 0]))));
	result = result.subtract(cube({ size: [kicknose_radius + 2, width, kicknose_radius], center: false }).translate([0, -width, -kicknose_radius]));

	result = result.union(rotate([0, kicknose_angle, 0], cube({ size: [kicknose_length + 10, width, kicknose_radius] })).translate([0, -width, 0]));
	result = result.translate([(concave_length / 2 + nose_transition_length), width / 2, -kicknose_radius]);
	// result = result.intersect((rotate([0,kicknose_angle,0], cube({size: [kicknose_length+10, width, kicknose_radius*4], center: false}))).translate([-(kicknose_length+10)/2,0,0]));

	//result = result.union((rotate([0,kicknose_angle,0], cube({size: [kicknose_length+10, width, kicknose_radius*2], center: false}))).translate([-(kicknose_length+10)/2,0,0]));
	return result;
}

function make_mold_kicktail_curve(kicktail_radius, width, kicktail_angle, tail_transition_length, concave_length, kicktail_length) {

	var result = new CSG();

	result = rotate([90, 0, 0], cylinder({ r: kicktail_radius, h: width, center: false, fn: 500 }));

	result = difference(result, cube({ size: [kicktail_radius * 2, width * 4, kicktail_radius * 4] }).translate([-kicktail_radius * 2, -width * 2, -kicktail_radius - 2]))
	result = result.subtract((rotate([0, kicktail_angle, 0], cube({ size: [kicktail_length + kicktail_radius, width, kicktail_radius * 2], center: false }).translate([0, -width, 0]))));
	result = result.subtract(cube({ size: [kicktail_radius + 2, width, kicktail_radius], center: false }).translate([0, -width, -kicktail_radius]));

	result = result.union(rotate([0, kicktail_angle, 0], cube({ size: [kicktail_length + 10, width, kicktail_radius] })).translate([0, -width, 0]));

	result = mirror([1, 0, 0], result);
	result = result.translate([(-(concave_length / 2 + tail_transition_length)), width / 2, -kicktail_radius]);

	//result = result.intersect((rotate([0,kicktail_angle,0], cube({size: [kicktail_length+10, width, kicktail_radius*4], center: false}))).translate([-(kicktail_length+10)/2,0,0]));

	//result = result.union((rotate([0,kicktail_angle,0], cube({size: [kicktail_length+10, width, kicktail_radius*2], center: false}))).translate([-(kicktail_length+10)/2,0,0]));
	return result;
}


function make_kicknose_section(wheelbase, bolt_pattern_length, nose_length, kicknose_length, kicknose_radius_length, width, kicknose_radius_height, thickness, kicknose_angle, nose_transition_length, concave_length) {
	var result = new CSG();

	result = mirror([0, 0, 1], cube({ size: [kicknose_length, width, thickness] }));
	result = rotate([0, -kicknose_angle, 0], result);
	result = result.translate([concave_length / 2 + nose_transition_length + kicknose_radius_length, -width / 2, kicknose_radius_height + thickness]);
	return result;
}

function make_kicktail_section(wheelbase, bolt_pattern_length, tail_length, kicktail_length, kicktail_radius_length, width, kicktail_radius_height, thickness, kicktail_angle, tail_transition_length, concave_length) {
	var result = new CSG();

	result = mirror([0, 0, 1], cube({ size: [kicktail_length, width, thickness] }));
	result = rotate([0, -kicktail_angle, 0], result);
	result = mirror([1, 0, 0], result);
	result = result.translate([-(concave_length / 2 + tail_transition_length + kicktail_radius_length), -width / 2, kicktail_radius_height + thickness]);
	return result;
}

/*---- added concave in kicks -----*/
function make_concave_kick(moldWidth, kickRadius, kickAngle, kickBaseDrop, kickRadiusEdge, kickAngleEdge, kickLength, moldHeight, kcRes) {

	var deckWidth = moldWidth;
	/*   var kickRadius = 4;
	   var kickAngle = 20;
	   var kickBaseDrop = 0.125;
	   var kickTipDrop = 0.25;
	   var kickRadiusEdge = 5;
	   var kickAngleEdge = 21;
	   var kickLength = 7+1;
	   var moldHeight = 4;*/

	var y_max = kickLength;
	var x_max = deckWidth / 2;

	var stepsPerY = 24 + kcRes; //how many iterations are done until we move onto next y value
	var stepsPerX = 8; //how many iterations done until move onto next x value

	var y_res = y_max / stepsPerY;
	var x_res = x_max / stepsPerX;

	var pointArray = [];
	var subArray = [];

	var x;
	var y;
	var z;

	var zRad; //radius of curve from zc to ze

	var coord; //point coordinates in x,y,z

	var i; //keep track of iterations

	var transitionZc;
	var transitionZe;
	var transitionYc;
	var transitionYe;


	var zc;
	var ze;

	for (y = 0; y <= y_max; y = y + y_res) { //as we move from kick base to tip
		if (y <= (kickRadius * sin(kickAngle))) { //get zc and ze first
			zc = kickRadius - sqrt((pow(kickRadius, 2) - pow(y, 2))); // get zc in radius section
			transitionZc = zc; //save last zc before change
			transitionYc = y;

		}
		else {
			zc = (kickRadius - (kickRadius * cos(kickAngle))) + ((y - kickRadius * sin(kickAngle)) * tan(kickAngle)); //get zc in stratight section
		}


		if (y <= (kickRadiusEdge * sin(kickAngleEdge))) {
			ze = kickBaseDrop + kickRadiusEdge - sqrt((pow(kickRadiusEdge, 2) - pow(y, 2))); //ze in radius section
			transitionZe = ze; //save last ze before change
			transitionYe = y;
		}
		else {
			ze = (kickBaseDrop + kickRadiusEdge - (kickRadiusEdge * cos(kickAngleEdge))) + ((y - kickRadiusEdge * sin(kickAngleEdge)) * tan(kickAngleEdge)); //ze in straight section
		}

		//now that we have zc and ze, we can find the z values in between, at specific x values

		for (x = 0; x <= x_max; x = x + x_res) {
			zRad = (pow(x_max, 2) + pow((ze - zc), 2)) / (2 * (ze - zc)); //establish the radius of the curve along the x axis

			z = zc + zRad - sqrt(pow(zRad, 2) - pow(x, 2));
			coord = [x, y, z];
			pointArray.push(coord);

			if (x !== x_max) {
				if (x + x_res > x_max) {
					x = x_max - x_res;
				}
			}
		}
		if (y !== y_max) {
			if (y + y_res > y_max) {
				y = y_max - y_res;
			}
		}


	}

	var finalZc = zc;
	var finalZe = ze;


	var triangleArray = [];

	var a = 0;
	var b = 1;
	var i;

	var maxTriangleArray = pointArray.length - stepsPerX - 2;


	for (i = 0; i <= maxTriangleArray; i = i + stepsPerX + 1) {

		for (a = i; a < (i + stepsPerX); a++) {
			triangleArray.push([(a), (a + 1), (stepsPerX + a + 1)]);
			if ((a + 1) <= (i + stepsPerX)) {
				triangleArray.push([(stepsPerX + a + 2), (stepsPerX + a + 1), a + 1]);
			}
		}

	}




	var result = polyhedron({ // 
		points: pointArray, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor(255, 255, 255);



	// triangleArray = findDuplicates(triangleArray);

	var mainPoly = polyhedron({
		points: pointArray,
		triangles: triangleArray
	});



	//side:

	var yeRadPts = [];
	var yei;
	for (yei = 0; yei <= (kickRadiusEdge * sin(kickAngleEdge)); yei = (yei + y_res)) {

		var zei = kickBaseDrop + kickRadiusEdge - sqrt((pow(kickRadiusEdge, 2) - pow(yei, 2)));
		yeRadPts.push([x_max, yei, zei]);

	}

	transitionZe = (kickBaseDrop + kickRadiusEdge - (kickRadiusEdge * cos(kickAngleEdge))) + ((yei - kickRadiusEdge * sin(kickAngleEdge)) * tan(kickAngleEdge));

	yeRadPts.push([x_max, yei, transitionZe]);

	var radialSection = yeRadPts.length;

	yeRadPts.push([x_max, y_max, ze], [x_max, y_max, moldHeight], [x_max, 0, moldHeight], [x_max, 0, kickBaseDrop]);



	var yeRadTriangles = [];

	for (var yej = 1; yej < (yeRadPts.length - 2); yej++) {
		yeRadTriangles.push([yej, (yeRadPts.length - 1), yej + 1]);

	}



	var yeRadCAG = polyhedron({
		points: yeRadPts,
		triangles: yeRadTriangles
	});

	//add yeRadTriangles to triangleArray:




	for (var k = 0; k < (yeRadTriangles.length); k++) {
		yeRadTriangles[k][0] += pointArray.length;
		yeRadTriangles[k][1] += pointArray.length;
		yeRadTriangles[k][2] += pointArray.length;

	}
	pointArray = pointArray.concat(yeRadPts);




	triangleArray = triangleArray.concat(yeRadTriangles);






	/*--------------------------------- yc -------------------*/
	/* var ycRadPts = [];
	  var yci;
	  for (yci=0; yci<=(kickRadius*sin(kickAngle)); yci=(yci+y_res)) {
	   
		  var zci = kickRadius-sqrt((pow(kickRadius,2)-pow(yci,2)));
		  ycRadPts.push([0,yci,zci]);
	    
	  }
	  
	  transitionZc = (kickRadius - (kickRadius*cos(kickAngle)))+((yci-kickRadius*sin(kickAngle))*tan(kickAngle));
	  
	  ycRadPts.push([0,yci,transitionZc]);
	  
	  var radialSectionC = ycRadPts.length;
	  
	  ycRadPts.push([0,y_max,zc],[0,y_max,moldHeight],[0,0,moldHeight],[0,0,0]);
	  
  
	  var ycRadTriangles = [];
	  
	  for (var ycj=1; ycj<(ycRadPts.length-2); ycj++){
		  ycRadTriangles.push([ycj+1,(ycRadPts.length-1),ycj]);
		  
	  }
  
  
	  
	  var ycRadCAG = polyhedron({
		  points: ycRadPts,
		  triangles: ycRadTriangles
	  });
  
	  //add ycRadTriangles to triangleArray:
	  
	  for (var k=0; k<(ycRadTriangles.length); k++){
		  ycRadTriangles[k][0]+=pointArray.length;
		  ycRadTriangles[k][1]+=pointArray.length;
		  ycRadTriangles[k][2]+=pointArray.length;
		  
	  }
	  pointArray = pointArray.concat(ycRadPts);
  
  
	 
	  triangleArray = triangleArray.concat(ycRadTriangles);
	 
  
  
  /*----------------- tip ---------------*/

	var tipRadPts = [];
	var xti;
	for (xti = 0; xti <= x_max; xti = (xti + x_res)) {

		var zRadt = (pow(x_max, 2) + pow((finalZe - finalZc), 2)) / (2 * (finalZe - finalZc)); //establish the radius of the curve along the x axis

		var zti = finalZc + zRadt - sqrt(pow(zRadt, 2) - pow(xti, 2));

		tipRadPts.push([xti, y_max, zti]);

	}
	tipRadPts.push([x_max, y_max, moldHeight]);

	var radialSectionTip = tipRadPts.length;

	tipRadPts.push([0, y_max, moldHeight]);

	var tipRadTriangles = [];

	for (var xtj = 0; xtj < (tipRadPts.length - 2); xtj++) {
		tipRadTriangles.push([xtj + 1, (tipRadPts.length - 1), xtj]);

	}



	var tipRadCAG = polyhedron({
		points: tipRadPts,
		triangles: tipRadTriangles
	});

	//add ycRadTriangles to triangleArray:



	for (var k = 0; k < (tipRadTriangles.length); k++) {
		tipRadTriangles[k][0] += pointArray.length;
		tipRadTriangles[k][1] += pointArray.length;
		tipRadTriangles[k][2] += pointArray.length;

	}
	pointArray = pointArray.concat(tipRadPts);

	triangleArray = triangleArray.concat(tipRadTriangles);


	/*----------------- base ---------------*/

	var baseRadPts = [];
	var xbi;
	var zeInit = kickBaseDrop;
	var zcInit = 0;
	for (xbi = 0; xbi <= x_max; xbi = (xbi + x_res)) {

		var zRadb = (pow(x_max, 2) + pow((zeInit - zcInit), 2)) / (2 * (zeInit - zcInit)); //establish the radius of the curve along the x axis

		var zbi = zcInit + zRadb - sqrt(pow(zRadb, 2) - pow(xbi, 2));

		baseRadPts.push([xbi, 0, zbi]);

	}
	baseRadPts.push([x_max, 0, moldHeight]);

	var radialSectionBase = baseRadPts.length;

	baseRadPts.push([0, 0, moldHeight]);

	var baseRadTriangles = [];

	for (var xbj = 0; xbj < (baseRadPts.length - 2); xbj++) {
		baseRadTriangles.push([xbj, (baseRadPts.length - 1), xbj + 1]);

	}



	var baseRadCAG = polyhedron({
		points: baseRadPts,
		triangles: baseRadTriangles
	});

	//add ycRadTriangles to triangleArray:

	for (var k = 0; k < (baseRadTriangles.length); k++) {
		baseRadTriangles[k][0] += pointArray.length;
		baseRadTriangles[k][1] += pointArray.length;
		baseRadTriangles[k][2] += pointArray.length;

	}
	pointArray = pointArray.concat(baseRadPts);

	triangleArray = triangleArray.concat(baseRadTriangles);


	/*------- bottom --------*/
	var bottomOffset = pointArray.length;

	pointArray = pointArray.concat(
		[[0, 0, moldHeight],
		[0, y_max, moldHeight],
		[x_max, y_max, moldHeight],
		[x_max, 0, moldHeight]]);

	triangleArray = triangleArray.concat(
		[[bottomOffset, bottomOffset + 1, bottomOffset + 2],
		[bottomOffset, bottomOffset + 2, bottomOffset + 3]]);

	/*------------ bring together --------------*/



	triangleArray.push(triangleArray[triangleArray.length - 1]);


	for (var i = 0; i < pointArray.length; i++) {
		for (var k = 0; k <= 2; k++) {
			pointArray[i][k] = Math.round((pointArray[i][k]) * 1000) / 1000;

		}


	}

	var finalArray = JSON.parse(JSON.stringify(pointArray));

	for (let i = 0; i < pointArray.length; i++) {
		finalArray.push([-pointArray[i][0], pointArray[i][1], pointArray[i][2]]);
	}

	var finalTriangleArray = JSON.parse(JSON.stringify(triangleArray));
	var triangleArrayLength = triangleArray.length;

	for (let i = 0; i < triangleArrayLength; i++) {
		finalTriangleArray.push([triangleArray[i][1] + pointArray.length, triangleArray[i][0] + pointArray.length, triangleArray[i][2] + pointArray.length]);

	}
	var mainPoly = polyhedron({
		points: finalArray,
		polygons: finalTriangleArray
	});


	return mainPoly;


}

function make_concave_kick_offset(moldWidth, kickRadius, kickAngle, kickBaseDrop, kickRadiusEdge, kickAngleEdge, kickLength, moldHeight, kcRes, offset) {

	var deckWidth = moldWidth;
	/*   var kickRadius = 4;
	   var kickAngle = 20;
	   var kickBaseDrop = 0.125;
	   var kickTipDrop = 0.25;
	   var kickRadiusEdge = 5;
	   var kickAngleEdge = 21;
	   var kickLength = 7+1;
	   var moldHeight = 4;*/

	var y_max = kickLength;
	var x_max = deckWidth / 2;

	var stepsPerY = 24 + kcRes; //how many iterations are done until we move onto next y value
	var stepsPerX = 8 + kcRes; //how many iterations done until move onto next x value

	var y_res = y_max / stepsPerY;
	var x_res = x_max / stepsPerX;

	var pointArray = [];
	var subArray = [];

	var x;
	var y;
	var z;

	var zRad; //radius of curve from zc to ze

	var coord; //point coordinates in x,y,z

	var i; //keep track of iterations

	var transitionZc;
	var transitionZe;
	var transitionYc;
	var transitionYe;


	var zc;
	var ze;

	var offsetArray = []; //array of points that will be offset

	var xcounter = 0; //keeps track whenever we change to a next x value

	for (y = 0; y <= y_max; y = y + y_res) { //as we move from kick base to tip
		xcounter = 0;
		if (y <= (kickRadius * sin(kickAngle))) { //get zc and ze first
			zc = kickRadius - sqrt((pow(kickRadius, 2) - pow(y, 2))); // get zc in radius section
			transitionZc = zc; //save last zc before change
			transitionYc = y;

		}
		else {
			zc = (kickRadius - (kickRadius * cos(kickAngle))) + ((y - kickRadius * sin(kickAngle)) * tan(kickAngle)); //get zc in stratight section
		}


		if (y <= (kickRadiusEdge * sin(kickAngleEdge))) {
			ze = kickBaseDrop + kickRadiusEdge - sqrt((pow(kickRadiusEdge, 2) - pow(y, 2))); //ze in radius section
			transitionZe = ze; //save last ze before change
			transitionYe = y;
		}
		else {
			ze = (kickBaseDrop + kickRadiusEdge - (kickRadiusEdge * cos(kickAngleEdge))) + ((y - kickRadiusEdge * sin(kickAngleEdge)) * tan(kickAngleEdge)); //ze in straight section
		}

		//now that we have zc and ze, we can find the z values in between, at specific x values

		for (x = 0; x <= x_max; x = x + x_res) {
			xcounter += 1;

			zRad = (pow(x_max, 2) + pow((ze - zc), 2)) / (2 * (ze - zc)); //establish the radius of the curve along the x axis

			z = zc + zRad - sqrt(pow(zRad, 2) - pow(x, 2));
			coord = [x, y, z];
			pointArray.push(coord);

			if (x !== x_max) {
				if (x + x_res > x_max) {
					x = x_max - x_res;
				}
			}
		}
		if (y !== y_max) {
			if (y + y_res > y_max) {
				y = y_max - y_res;
			}
		}


	}

	var finalZc = zc;
	var finalZe = ze;


	var triangleArray = [];

	var a = 0;
	var b = 1;
	var i;

	var maxTriangleArray = pointArray.length - stepsPerX - 2;


	for (i = 0; i <= maxTriangleArray; i = i + stepsPerX + 1) {

		for (a = i; a < (i + stepsPerX); a++) {
			triangleArray.push([(a), (a + 1), (stepsPerX + a + 1)]);
			if ((a + 1) <= (i + stepsPerX)) {
				triangleArray.push([(stepsPerX + a + 2), (stepsPerX + a + 1), a + 1]);
			}
		}

	}



	for (let i = 0; i < (pointArray.length); i += xcounter) {
		const chunk = pointArray.slice(i, i + xcounter);
		offsetArray.push(chunk);
	}


	//our "offsetArray" is now an array of arrays split whenever we iterate the x value.

	var offsetPoints = JSON.parse(JSON.stringify(pointArray)); //offsetPoints will be the array of points we offset, while offsetArray is used for keeping track

	var last_x = -1;
	var last_y = -1;
	var last_z = 0;
	var last_zy = 0;

	var x_offset, y_offset, z_offset;

	var phi; //angle of offset point against x axis
	var beta; //angle of offset point against y axis

	//the difference from the last point to the current point for generating normals
	var delta_x;
	var delta_z;
	var delta_z;

	var current_x, current_y, current_z;
	var j = 0;



	var offsetYePts = []; //offset edge points
	var offsetYcPts = []; //offset center points
	var offsetYtPts = [];
	var offsetTipPts = [];

	for (let i = 0; i < pointArray.length; i++) { //as we move to each point

		//offset the x value

		j = i - 1;

		current_x = pointArray[i][0]; // get the current x value
		current_y = pointArray[i][1]; //get the current y value
		current_z = pointArray[i][2]; // get the current z value we calculated earlier

		// to find last_z:
		if (current_x == 0) {
			last_z = current_z; //we are at the edge and we want phi to be 0;
			last_x = -1;
		}

		else {
			last_z = pointArray[j][2]; //the previous point's z value
			last_x = pointArray[j][0]; //the previous point's x value
		}


		delta_x = current_x - last_x;
		delta_z = current_z - last_z;

		phi = abs(90 - atan(delta_z / delta_x));

		if (phi == 90) {
			phi = 0; //to prevent infinity/NaN
		}

		//to find the previous y value and z value when x was the same
		if (current_y == 0) {
			last_y = -1;
			last_zy = current_z;

		}

		else if (current_y == y_max) {
			last_y = y_max - y_res;
			last_zy = pointArray[i - xcounter][2];

		}

		else {
			last_y = current_y - y_res;
			last_zy = pointArray[i - xcounter][2];
		}



		delta_zy = current_z - last_zy;
		delta_y = current_y - last_y; //along y-axis, not along x



		beta = abs(90 - atan(delta_zy / delta_y));

		if (beta == 90) {
			beta = 0; //to prevent infinity/NaN
		}


		/* --------------*/

		var x_component = 1 / Math.pow(tan(phi), 2);
		var y_component = 1 / Math.pow(tan(beta), 2);

		if (!isFinite(x_component)) {
			x_component = 0;
		}

		if (!isFinite(y_component)) {
			y_component = 0;
		}

		z_offset = sqrt(Math.pow(offset, 2) / (x_component + y_component + 1));



		x_offset = z_offset / tan(phi);

		y_offset = z_offset / tan(beta);



		if (!isFinite(x_offset)) {
			x_offset = 0;
		}

		if (!isFinite(y_offset)) {
			y_offset = 0;
		}


		if (z_offset == 0) {
			z_offset = offset;
		}



		offsetPoints[i][0] += x_offset;
		offsetPoints[i][1] += y_offset;
		offsetPoints[i][2] -= z_offset;

		if (current_x == x_max) { //ye pts
			offsetYePts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_x == 0) { //yc pts
			offsetYcPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_y == 0) { //transition pts
			offsetYtPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_y == y_max) {
			offsetTipPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

	}

	var offsetPointsGroupedRef = JSON.parse(JSON.stringify(offsetPoints));
	var offsetPointsGrouped = [];

	for (let i = 0; i < (offsetPointsGroupedRef.length); i += xcounter) {
		const chunk = offsetPointsGroupedRef.slice(i, i + xcounter);
		offsetPointsGrouped.push(chunk);
	}

	/*--------- ye -------------*/

	offsetYePts.push([x_max, y_max, moldHeight], [x_max, 0, moldHeight]);

	var offsetYeTriangles = [];
	for (i = 0; i < (offsetYePts.length - 2); i++) {
		offsetYeTriangles.push([i, offsetYePts.length - 1, i + 1]);
	}


	for (var k = 0; k < offsetYeTriangles.length; k++) {
		offsetYeTriangles[k][0] += offsetPoints.length;
		offsetYeTriangles[k][1] += offsetPoints.length;
		offsetYeTriangles[k][2] += offsetPoints.length;
	}


	offsetPoints = offsetPoints.concat(offsetYePts);
	triangleArray = triangleArray.concat(offsetYeTriangles);

	/*--------- yc --------------*/

	/*offsetYcPts.push([0,y_max,moldHeight],[0,0,moldHeight]);
	
	var offsetYcTriangles = [];
	for (i=0; i<(offsetYcPts.length-2);i++) {
		offsetYcTriangles.push([offsetYcPts.length-1,i,i+1]);
	}
	
	for (var k=0; k<offsetYcTriangles.length; k++){
		offsetYcTriangles[k][0]+=offsetPoints.length;
		offsetYcTriangles[k][1]+=offsetPoints.length;
		offsetYcTriangles[k][2]+=offsetPoints.length;
	}
	
	
	 offsetPoints = offsetPoints.concat(offsetYcPts);
	 triangleArray = triangleArray.concat(offsetYcTriangles);
	
	/*--------- transition ----------*/

	offsetYtPts.push([x_max, 0, moldHeight], [0, 0, moldHeight]);

	var offsetYtTriangles = [];
	for (i = 0; i < (offsetYtPts.length - 2); i++) {
		offsetYtTriangles.push([i, offsetYtPts.length - 1, i + 1]);
	}

	for (var k = 0; k < offsetYtTriangles.length; k++) {
		offsetYtTriangles[k][0] += offsetPoints.length;
		offsetYtTriangles[k][1] += offsetPoints.length;
		offsetYtTriangles[k][2] += offsetPoints.length;
	}

	offsetPoints = offsetPoints.concat(offsetYtPts);
	triangleArray = triangleArray.concat(offsetYtTriangles);

	/*--------- tip ---------------*/

	offsetTipPts.push([x_max, y_max, moldHeight], [0, y_max, moldHeight]);

	var offsetTipTriangles = [];
	for (i = 0; i < (offsetTipPts.length - 2); i++) {
		offsetTipTriangles.push([offsetTipPts.length - 1, i, i + 1]);
	}

	for (var k = 0; k < offsetTipTriangles.length; k++) {
		offsetTipTriangles[k][0] += offsetPoints.length;
		offsetTipTriangles[k][1] += offsetPoints.length;
		offsetTipTriangles[k][2] += offsetPoints.length;
	}


	offsetPoints = offsetPoints.concat(offsetTipPts);
	triangleArray = triangleArray.concat(offsetTipTriangles);

	/*---------- bottom ------------*/

	var bottomPts = [[0, 0, moldHeight], [x_max, 0, moldHeight], [x_max, y_max, moldHeight], [0, y_max, moldHeight]];

	bottomTriangles = [[0, 2, 1], [0, 3, 2]];

	for (var k = 0; k < bottomTriangles.length; k++) {
		bottomTriangles[k][0] += offsetPoints.length;
		bottomTriangles[k][1] += offsetPoints.length;
		bottomTriangles[k][2] += offsetPoints.length;
	}


	offsetPoints = offsetPoints.concat(bottomPts);
	triangleArray = triangleArray.concat(bottomTriangles);



	/*------------ bring together --------------*/

	for (var i = 0; i < offsetPoints.length; i++) {
		for (var k = 0; k <= 2; k++) {
			offsetPoints[i][k] = Math.round((offsetPoints[i][k]) * 1000) / 1000;

		}
	}


	var finalArray = JSON.parse(JSON.stringify(offsetPoints));

	for (let i = 0; i < offsetPoints.length; i++) {
		finalArray.push([-offsetPoints[i][0], offsetPoints[i][1], offsetPoints[i][2]]);
	}

	var finalTriangleArray = JSON.parse(JSON.stringify(triangleArray));
	var triangleArrayLength = triangleArray.length;

	for (let i = 0; i < triangleArrayLength; i++) {
		finalTriangleArray.push([triangleArray[i][1] + offsetPoints.length, triangleArray[i][0] + offsetPoints.length, triangleArray[i][2] + offsetPoints.length]);

	}
	var resultOffset = polyhedron({
		points: finalArray,
		polygons: finalTriangleArray
	});



	return resultOffset.translate([0, 0, offset]);

}


function make_transition_section(transition_length, thickness, slice_thickness, width, min_radius, number_of_segments) {
	var result = new CSG();

	var number_of_steps = transition_length / slice_thickness;
	var concave_depth = (2 * min_radius - sqrt(pow(2 * min_radius, 2) - (4 * 1 * pow(width, 2) / 4))) / (2 * 1);
	var mid_depth = concave_depth / 2;
	var mid_radius = (pow(mid_depth, 2) + (pow(width, 2) / 4)) / (2 * mid_depth);
	//	var max_radius = pow(mid_radius,2);
	//if poor transition, uncomment the following and comment the above:
	var max_radius = 6 * mid_radius;
	var correction = mid_radius;
	var radius_range = max_radius - min_radius;
	var radius_offset = min_radius;
	var sub_radius_range = (max_radius + thickness) - (min_radius + thickness);
	var sub_radius_offset = min_radius + thickness;

	//y values for edges of arc
	var normal_y = ((2 * min_radius) - Math.sqrt(Math.pow(2 * min_radius, 2) - (4 * Math.pow((width / 2), 2)))) / (2); //concave depth
	var flat_y = 0; //no concave


	//1/16/21 EDIT: change to cubic Bezier curve
	// B(t) = [(1-t)^3]P0 + 3[(1-t)^2]tP1 + 3[(1-t)t^2]P2 + (t^3)P3
	var i_range = 1; //range for t, which must be 0 <= t <= 1
	var i_size = i_range / number_of_steps; //change in x value per change in step

	var origin_x = 0;
	var origin_y = 0;

	var a = 0; //initial t value of Bezier

	a = a + i_size; //prevent dividing by 0

	var x0 = 0;
	var x1 = transition_length / 4;
	var x2 = transition_length * (2 / 3);
	var x3 = transition_length;

	var y0 = 0;
	var y1 = 0;
	var y2 = concave_depth;
	var y3 = concave_depth;


	var slice_adj = 0;
	var x_val_last = 0;

	for (var i = a; i < (i_range + i_size); i = i + i_size) //starting at 0, going until 1, increment at i_size
	{

		/*	if (i < 0) {
				var y_val = normal_y+((flat_y-normal_y)/(1+Math.exp(i*1.25)));
			}
		    
			else {
				var y_val = normal_y+((flat_y-normal_y)/(1+Math.exp(i)));
			    
			}
			*/

		// 1/16/21 EDIT: Bezier curve:

		var t = i;

		var x_val = ((Math.pow((1 - t), 3)) * x0) + (3 * (Math.pow((1 - t), 2)) * t * x1) + (3 * ((1 - t)) * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * x3);
		var y_val = ((Math.pow((1 - t), 3)) * y0) + (3 * (Math.pow((1 - t), 2)) * t * y1) + (3 * ((1 - t)) * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * y3);

		var reg_radius = (Math.pow((width / 2), 2) + Math.pow(y_val, 2)) / (2 * y_val);
		var reg_half_angle = Math.round(asin((width / 2) / reg_radius) * 10000) / 10000;
		var reg_segment_angle = reg_half_angle / number_of_segments;

		var sub_radius = reg_radius + thickness;
		var sub_half_angle = asin((width / 2) / sub_radius);
		var sub_segment_angle = sub_half_angle / number_of_segments;



		result = result.union(

			linear_extrude({ height: x_val - x_val_last, center: false },
				polygon({			//currently set up for 20 segments per full arc:
					points: [
						[(sub_radius * sin(sub_segment_angle * 0)), (sub_radius * cos(sub_segment_angle * 0))],
						[(sub_radius * sin(sub_segment_angle * 1)), (sub_radius * cos(sub_segment_angle * 1))],
						[(sub_radius * sin(sub_segment_angle * 2)), (sub_radius * cos(sub_segment_angle * 2))],
						[(sub_radius * sin(sub_segment_angle * 3)), (sub_radius * cos(sub_segment_angle * 3))],
						[(sub_radius * sin(sub_segment_angle * 4)), (sub_radius * cos(sub_segment_angle * 4))],
						[(sub_radius * sin(sub_segment_angle * 5)), (sub_radius * cos(sub_segment_angle * 5))],
						[(sub_radius * sin(sub_segment_angle * 6)), (sub_radius * cos(sub_segment_angle * 6))],
						[(sub_radius * sin(sub_segment_angle * 7)), (sub_radius * cos(sub_segment_angle * 7))],
						[(sub_radius * sin(sub_segment_angle * 8)), (sub_radius * cos(sub_segment_angle * 8))],
						[(sub_radius * sin(sub_segment_angle * 9)), (sub_radius * cos(sub_segment_angle * 9))],
						[(sub_radius * sin(sub_segment_angle * 10)), (sub_radius * cos(sub_segment_angle * 10))],

						[(reg_radius * sin(reg_segment_angle * 10)), (reg_radius * cos(reg_segment_angle * 10))],
						[(reg_radius * sin(reg_segment_angle * 9)), (reg_radius * cos(reg_segment_angle * 9))],
						[(reg_radius * sin(reg_segment_angle * 8)), (reg_radius * cos(reg_segment_angle * 8))],
						[(reg_radius * sin(reg_segment_angle * 7)), (reg_radius * cos(reg_segment_angle * 7))],
						[(reg_radius * sin(reg_segment_angle * 6)), (reg_radius * cos(reg_segment_angle * 6))],
						[(reg_radius * sin(reg_segment_angle * 5)), (reg_radius * cos(reg_segment_angle * 5))],
						[(reg_radius * sin(reg_segment_angle * 4)), (reg_radius * cos(reg_segment_angle * 4))],
						[(reg_radius * sin(reg_segment_angle * 3)), (reg_radius * cos(reg_segment_angle * 3))],
						[(reg_radius * sin(reg_segment_angle * 2)), (reg_radius * cos(reg_segment_angle * 2))],
						[(reg_radius * sin(reg_segment_angle * 1)), (reg_radius * cos(reg_segment_angle * 1))],
						[(reg_radius * sin(reg_segment_angle * 0)), (reg_radius * cos(reg_segment_angle * 0))]
					]
				})).translate([0, -sub_radius, x_val_last])

		);
		x_val_last = x_val;
		slice_adj = slice_adj + slice_thickness;


	}
	result = result.union(mirror([1, 0, 0], result));
	result = rotate([-90, 0, 0], result);

	return result;
}

function make_mold_transition_section(transition_length, thickness, slice_thickness, width, min_radius, number_of_segments) {
	var result = new CSG();

	var number_of_steps = transition_length / slice_thickness;
	var concave_depth = (2 * min_radius - sqrt(pow(2 * min_radius, 2) - (4 * 1 * pow(width, 2) / 4))) / (2 * 1);
	var mid_depth = concave_depth / 2;
	var mid_radius = (pow(mid_depth, 2) + (pow(width, 2) / 4)) / (2 * mid_depth);
	//	var max_radius = pow(mid_radius,2);
	//if poor transition, uncomment the following and comment the above:
	var max_radius = 6 * mid_radius;
	var correction = mid_radius;
	var radius_range = max_radius - min_radius;
	var radius_offset = min_radius;
	var sub_radius_range = (max_radius + thickness) - (min_radius + thickness);
	var sub_radius_offset = min_radius + thickness;

	//y values for edges of arc
	var normal_y = ((2 * min_radius) - Math.sqrt(Math.pow(2 * min_radius, 2) - (4 * Math.pow((width / 2), 2)))) / (2);
	var flat_y = 0;

	//for start and end tangency, plot hollow cylindrical arcs as a sigmoid function... y = 1/(1+e^x).  Adjust for the radius size (multiply by the range), then offset for the minimum (add min_radius)

	//1/16/21 EDIT: change to cubic Bezier curve
	// B(t) = [(1-t)^3]P0 + 3[(1-t)^2]tP1 + 3[(1-t)t^2]P2 + (t^3)P3
	var i_range = 1; //range for t, which must be 0 <= t <= 1
	var i_size = i_range / number_of_steps; //change in x value per change in step

	//console.log('# steps = ' +number_of_steps);
	//console.log('i_size = '+i_size);

	var origin_x = 0;
	var origin_y = 0;

	var a = 0; //initial t value of Bezier

	a = a + i_size; //prevent dividing by 0

	var x0 = 0;
	var x1 = transition_length / 4;
	var x2 = transition_length * (2 / 3);
	var x3 = transition_length;

	var y0 = 0;
	var y1 = 0;
	var y2 = concave_depth;
	var y3 = concave_depth;

	var slice_adj = 0;
	var x_val_last = 0;
	for (var i = a; i < (i_range + i_size); i = i + i_size) //starting at 0, going until 1, increment at i_size
	{

		/*if (i < 0) {
			var y_val = normal_y+((flat_y-normal_y)/(1+Math.exp(i*1.25)));
		}
	    
		else {
			var y_val = normal_y+((flat_y-normal_y)/(1+Math.exp(i)));
		    
		}*/

		//(x - h)^2 + (y - k)^2 = R^2, where (h,k) is the center of the concave circle
		//we know h = 0, since it is in line with the bottom of the circle
		//we know two points: (0,0) and (width/2,y_val)
		//Two equations:
		//(0 - 0)^2 + (0 - k)^2 = R^2
		// ---> k = R
		//(width/2 - 0)^2 + (y_val - R)^2 = R^2
		//(width/2)^2 + y_val^2 - 2R*y_val = 0
		//2R*y_val = (width/2)^2 + y_val^2

		// 1/16/21 EDIT: Bezier curve:

		var t = i;

		var x_val = ((Math.pow((1 - t), 3)) * x0) + (3 * (Math.pow((1 - t), 2)) * t * x1) + (3 * ((1 - t)) * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * x3);
		var y_val = ((Math.pow((1 - t), 3)) * y0) + (3 * (Math.pow((1 - t), 2)) * t * y1) + (3 * ((1 - t)) * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * y3);

		var reg_radius = (Math.pow((width / 2), 2) + Math.pow(y_val, 2)) / (2 * y_val);

		// console.log("reg_radius is ");


		//var reg_radius = radius_offset+(radius_range/(1+Math.exp(i)));
		var reg_half_angle = asin((width / 2) / reg_radius);
		var reg_segment_angle = reg_half_angle / number_of_segments;
		//console.log("half angle is ");
		// console.log(reg_half_angle);
		result = result.union(

			linear_extrude({ height: x_val - x_val_last, center: false },
				polygon({			//currently set up for 20 segments per full arc:
					points: [

						/*[Math.round((reg_radius*sin(reg_segment_angle*12))*100000000000)/100000000000,Math.round((reg_radius*cos(reg_segment_angle*12))*100000000000)/100000000000],
						[Math.round((reg_radius*sin(reg_segment_angle*11))*100000000000)/100000000000,Math.round((reg_radius*cos(reg_segment_angle*11))*100000000000)/100000000000],
						[Math.round((reg_radius*sin(reg_segment_angle*10))*100000000000)/100000000000,Math.round((reg_radius*cos(reg_segment_angle*10))*100000000000)/100000000000],
						[Math.round((reg_radius*sin(reg_segment_angle*9))*100000000000)/100000000000,Math.round((reg_radius*cos(reg_segment_angle*9))*100000000000)/100000000000],*/
						[Math.round((reg_radius * sin(reg_segment_angle * 8)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 8)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 7)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 7)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 6)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 6)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 5)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 5)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 4)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 4)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 3)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 3)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 2)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 2)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 1)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 1)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 0)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 0)) * 100000000000) / 100000000000],
						[Math.round((reg_radius * sin(reg_segment_angle * 0)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 0)) * 100000000000) / 100000000000 - 5],
						[Math.round((reg_radius * sin(reg_segment_angle * 8)) * 100000000000) / 100000000000, Math.round((reg_radius * cos(reg_segment_angle * 8)) * 100000000000) / 100000000000 - 5]
						/*
						[(reg_radius*sin(reg_segment_angle*10)),(reg_radius*cos(reg_segment_angle*10))],
						[(reg_radius*sin(reg_segment_angle*9)),(reg_radius*cos(reg_segment_angle*9))],
						[(reg_radius*sin(reg_segment_angle*8)),(reg_radius*cos(reg_segment_angle*8))],
						[(reg_radius*sin(reg_segment_angle*7)),(reg_radius*cos(reg_segment_angle*7))],
						[(reg_radius*sin(reg_segment_angle*6)),(reg_radius*cos(reg_segment_angle*6))],
						[(reg_radius*sin(reg_segment_angle*5)),(reg_radius*cos(reg_segment_angle*5))],
						[(reg_radius*sin(reg_segment_angle*4)),(reg_radius*cos(reg_segment_angle*4))],
						[(reg_radius*sin(reg_segment_angle*3)),(reg_radius*cos(reg_segment_angle*3))],
						[(reg_radius*sin(reg_segment_angle*2)),(reg_radius*cos(reg_segment_angle*2))],
						[(reg_radius*sin(reg_segment_angle*1)),(reg_radius*cos(reg_segment_angle*1))],
						[(reg_radius*sin(reg_segment_angle*0)),(reg_radius*cos(reg_segment_angle*0))],
						[(reg_radius*sin(reg_segment_angle*0)),(reg_radius*cos(reg_segment_angle*0))-(5)],
						[(reg_radius*sin(reg_segment_angle*10)),(reg_radius*cos(reg_segment_angle*10))-(5)]*/
					]
				})).translate([0, -reg_radius, x_val_last])
			//each slice is slice_thickness wide, so move that much each time
		);
		x_val_last = x_val;
		slice_adj = slice_adj + slice_thickness;

		//console.log("i is " + i);



	}
	result = result.union(mirror([1, 0, 0], result));
	result = rotate([90, 0, -90], result);
	result = result.translate([0, 0, 0]);

	return result;
}


function make_mold_transition_section_new(transition_length, thickness, slice_thickness, width, min_radius, number_of_segments, model_res, kick_base_drop) {
	var section_depth = thickness;

	var y_max = transition_length;
	var x_max = width / 2;

	var concave_depth = (2 * min_radius - sqrt(pow(2 * min_radius, 2) - (4 * 1 * pow(width, 2) / 4))) / (2 * 1);

	var stepsPerY = model_res; //how many iterations are done until we move onto next y value
	var stepsPerX = model_res; //how many iterations done until move onto next x value

	var xStepSize = x_max / stepsPerX;

	// B(t) = [(1-t)^3]P0 + 3[(1-t)^2]tP1 + 3[(1-t)t^2]P2 + (t^3)P3
	var i_range = 1; //range for t, which must be 0 <= t <= 1

	//the direction of i is the direction of y

	var i_size = i_range / stepsPerY;

	var origin_x = 0;
	var origin_y = 0;

	var a = 0; //initial t value of Bezier

	var x0 = 0;
	var x1 = transition_length / 4;
	var x2 = transition_length * (2 / 3);
	var x3 = transition_length;

	var y0 = kick_base_drop;
	var y1 = kick_base_drop;
	var y2 = concave_depth;
	var y3 = concave_depth;

	var z;

	var slice_adj = 0;
	var x_val_last = 0;

	var transition_points = [];

	if (kick_base_drop == 0) {
		a = a + i_size; //prevent dividing by 0

		for (var i = 0; i <= x_max; i = i + xStepSize) {
			transition_points.push([i, 0, 0]);
		}

	}


	var concave_array = []; /*this is the last array of points along the x-axis (width) before the concave section*/

	var kick_array = []; /*this is the first array of points along the x-axis (y=0), needed for kick base drop*/

	var bezier_array = [[width / 2, 0, 0]]; /*array of points along edge of bezier curve*/


	for (var i = a; i < (i_range + i_size); i = i + i_size) //starting at 0, going until 1, increment at i_size
	{
		var t = i;

		var x_val = ((Math.pow((1 - t), 3)) * x0) + (3 * (Math.pow((1 - t), 2)) * t * x1) + (3 * ((1 - t)) * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * x3); //actually the position along y
		var y_val = ((Math.pow((1 - t), 3)) * y0) + (3 * (Math.pow((1 - t), 2)) * t * y1) + (3 * ((1 - t)) * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * y3); //actually the z height

		var reg_radius = (Math.pow((width / 2), 2) + Math.pow(y_val, 2)) / (2 * y_val);

		var reg_half_angle = asin((width / 2) / reg_radius);
		var reg_segment_angle = reg_half_angle / stepsPerX / 2;
		var counter = 0;
		for (var j = 0; j <= x_max; j = j + xStepSize) {

			z = Math.round(tan(reg_segment_angle * counter) * (j) * 1000) / 1000;

			transition_points.push([j, x_val, z]);

			if (t == 0) {
				kick_array.push([j, x_val, z]);
			}

			if (t == 1) {
				concave_array.push([j, x_val, z]);
			}

			if (j == x_max) {
				bezier_array.push([j, x_val, z]);
			}

			counter++;


		}


	}

	var triangleArray = [];
	var c = 0;
	var b = 1;
	var i;
	var maxTriangleArray = transition_points.length - stepsPerX - 2;

	for (i = 0; i <= maxTriangleArray; i = i + stepsPerX + 1) {

		for (c = i; c < (i + stepsPerX); c++) {
			triangleArray.push([(c), (c + 1), (stepsPerX + c + 1)]);
			if ((c + 1) <= (i + stepsPerX)) {
				triangleArray.push([(stepsPerX + c + 2), (stepsPerX + c + 1), c + 1]);
			}
		}
	}



	/*var result1= polyhedron({ // 
		 points: transition_points, // 
		 triangles: triangleArray // two triangles for square base
		});
		*/




	/* ------------ kick side --------*/

	if (kick_base_drop !== 0) {
		var kick_side_points = kick_array; /*get just the points along 
    	the curve, which will vary with resolution.*/

		var kick_array_length = kick_side_points.length;

		kick_array.push([0, 0, section_depth]);
		kick_array.push([width / 2, 0, section_depth]);

		var kickSideTriangles = [];

		for (var j = 0; j < kick_array_length - 1; j++) {
			kickSideTriangles.push([j + 1, j, kick_array_length]);
		}

		kickSideTriangles.push([kick_array_length - 1, kick_array.length - 2, kick_array.length - 1]);

		for (var k = 0; k < (kickSideTriangles.length); k++) {

			kickSideTriangles[k][0] += transition_points.length;
			kickSideTriangles[k][1] += transition_points.length;
			kickSideTriangles[k][2] += transition_points.length;

		}

		transition_points = transition_points.concat(kick_array);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	else {

		var kickSidePoints = [
			[0, 0, 0],
			[width / 2, 0, 0],
			[0, 0, section_depth],
			[width / 2, 0, section_depth]
		];

		var kickSideTriangles = [
			[2, 1, 0],
			[2, 3, 1]
		];

		for (var k = 0; k < (kickSideTriangles.length); k++) {
			kickSideTriangles[k][0] += transition_points.length;
			kickSideTriangles[k][1] += transition_points.length;
			kickSideTriangles[k][2] += transition_points.length;

		}


		transition_points = transition_points.concat(kickSidePoints);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	/* var result= polyhedron({ // 
	  points: transition_points, // 
	  triangles: triangleArray // two triangles for square base
	 }).setColor(255,255,255);
	 
	 
	 
   return result;
   */

	/* ------------ center of transition section --------*/

	/*var transitionCenterPoints = [
		[0,0,0],
		[0,transition_length,0],
		[0,0,section_depth],
		[0,transition_length,section_depth]
	];
	
	var transitionCenterTriangles = [
		[0,1,2],
		[1,3,2]
	];
	 
	 for (var k=0; k<(transitionCenterTriangles.length); k++){
		transitionCenterTriangles[k][0]+=transition_points.length;
		transitionCenterTriangles[k][1]+=transition_points.length;
		transitionCenterTriangles[k][2]+=transition_points.length;
	    
	}
	   
	   
	   transition_points = transition_points.concat(transitionCenterPoints);
	   
	   triangleArray = triangleArray.concat(transitionCenterTriangles);
	
	   
	 /*  var result= polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	   }).setColor(255,255,255);
	   
	   
	   
	   
	 return result;*/


	/* ------------ concave end of transition section --------*/

	//points are concave_array points, plus the border points, which are added below:

	var concave_array_curve_points = concave_array; /*get just the points along 
	the curve, which will vary with resolution.*/

	var curve_array_length = concave_array_curve_points.length;

	concave_array.push([0, transition_length, section_depth]);
	concave_array.push([width / 2, transition_length, section_depth]);

	var concaveSideTriangles = [];


	for (var j = 0; j < curve_array_length - 1; j++) {
		concaveSideTriangles.push([j, j + 1, curve_array_length]);
	}

	concaveSideTriangles.push([curve_array_length - 1, concave_array.length - 1, concave_array.length - 2]);



	/* var result=polyhedron({
		points: concave_array,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/

	for (var k = 0; k < (concaveSideTriangles.length); k++) {
		concaveSideTriangles[k][0] += transition_points.length;
		concaveSideTriangles[k][1] += transition_points.length;
		concaveSideTriangles[k][2] += transition_points.length;

	}


	transition_points = transition_points.concat(concave_array);

	triangleArray = triangleArray.concat(concaveSideTriangles);


	var result = polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	}).setColor(255, 255, 255);


	/* ------------ edge of transition section (along bezier) --------*/

	//points are bezier_array points, plus the border points, which are added below:

	var bezier_array_length = bezier_array.length; /*first, store the value of */

	bezier_array.push([width / 2, 0, section_depth]);
	bezier_array.push([width / 2, transition_length, section_depth]);

	var bezierTriangles = [];


	for (var j = 0; j < bezier_array_length - 1; j++) {
		bezierTriangles.push([bezier_array_length, j + 1, j]);
	}

	bezierTriangles.push([bezier_array.length - 2, bezier_array.length - 1, bezier_array_length - 1]);


	/* var result=polyhedron({
		points: concave_array,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/


	for (var k = 0; k < (bezierTriangles.length); k++) {

		bezierTriangles[k][0] += transition_points.length;
		bezierTriangles[k][1] += transition_points.length;
		bezierTriangles[k][2] += transition_points.length;

	}


	transition_points = transition_points.concat(bezier_array);

	triangleArray = triangleArray.concat(bezierTriangles);


	/*  var result= polyhedron({ // 
	   points: transition_points, // 
	   triangles: triangleArray // two triangles for square base
	  }).setColor(255,255,255);
			    
	  
    
	  
	return result;*/

	/* ------------ bottom --------*/

	var bottomPoints = [
		[0, 0, section_depth],
		[width / 2, 0, section_depth],
		[0, transition_length, section_depth],
		[width / 2, transition_length, section_depth]
	];

	var bottomTriangles = [
		[2, 1, 0],
		[2, 3, 1]
	];

	for (var k = 0; k < (bottomTriangles.length); k++) {

		bottomTriangles[k][0] += transition_points.length;
		bottomTriangles[k][1] += transition_points.length;
		bottomTriangles[k][2] += transition_points.length;

	}


	transition_points = transition_points.concat(bottomPoints);

	triangleArray = triangleArray.concat(bottomTriangles);

	for (let i = 0; i < transition_points.length; i++) {
		for (let j = 0; j < 3; j++) {
			transition_points[i][j] = Math.round(transition_points[i][j] * 1000) / 1000;
		}

	}

	var finalArray = JSON.parse(JSON.stringify(transition_points));

	for (let i = 0; i < transition_points.length; i++) {
		finalArray.push([-transition_points[i][0], transition_points[i][1], transition_points[i][2]]);
	}

	var finalTriangleArray = JSON.parse(JSON.stringify(triangleArray));
	var triangleArrayLength = triangleArray.length;

	for (let i = 0; i < triangleArrayLength; i++) {
		finalTriangleArray.push([triangleArray[i][1] + transition_points.length, triangleArray[i][0] + transition_points.length, triangleArray[i][2] + transition_points.length]);

	}



	var result = polyhedron({ // 
		points: finalArray, // 
		triangles: finalTriangleArray // two triangles for square base
	}).setColor(0.9, 0.9, 0.9);

	//result = result.union(mirror([1,0,0],result));
	result = rotate([180, 0, -90], result);
	result = result.translate([0, 0, 0]);
	return result; //radial transition section






}

function make_mold_transition_section_offset(transition_length, thickness, slice_thickness, width, min_radius, number_of_segments, model_res, kick_base_drop, offset) {
	var section_depth = thickness - offset;

	var y_max = transition_length;
	var x_max = width / 2;

	var concave_depth = (2 * min_radius - sqrt(pow(2 * min_radius, 2) - (4 * 1 * pow(width, 2) / 4))) / (2 * 1);

	var stepsPerY = model_res; //how many iterations are done until we move onto next y value
	var stepsPerX = model_res; //how many iterations done until move onto next x value

	var xStepSize = x_max / stepsPerX;

	// B(t) = [(1-t)^3]P0 + 3[(1-t)^2]tP1 + 3[(1-t)t^2]P2 + (t^3)P3
	var i_range = 1; //range for t, which must be 0 <= t <= 1

	//the direction of i is the direction of y

	var i_size = i_range / stepsPerY;

	var origin_x = 0;
	var origin_y = 0;

	var a = 0; //initial t value of Bezier

	var x0 = 0;
	var x1 = transition_length / 4;
	var x2 = transition_length * (2 / 3);
	var x3 = transition_length;

	var y0 = kick_base_drop;
	var y1 = kick_base_drop;
	var y2 = concave_depth;
	var y3 = concave_depth;

	var z;

	var slice_adj = 0;
	var x_val_last = 0;

	var transition_points = [];

	if (kick_base_drop == 0) {
		a = a + i_size; //prevent dividing by 0

		for (var i = 0; i <= x_max; i = i + xStepSize) {
			transition_points.push([i, 0, 0]);
		}

	}


	var concave_array = []; /*this is the last array of points along the x-axis (width) before the concave section*/

	var kick_array = []; /*this is the first array of points along the x-axis (y=0), needed for kick base drop*/

	var bezier_array = [[width / 2, 0, 0]]; /*array of points along edge of bezier curve*/


	var offsetArray = []; //array of points that will be offset



	for (var i = a; i < (i_range + i_size); i = i + i_size) //starting at 0, going until 1, increment at i_size
	{
		var t = i;

		var x_val = ((Math.pow((1 - t), 3)) * x0) + (3 * (Math.pow((1 - t), 2)) * t * x1) + (3 * ((1 - t)) * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * x3); //actually the position along y
		var y_val = ((Math.pow((1 - t), 3)) * y0) + (3 * (Math.pow((1 - t), 2)) * t * y1) + (3 * ((1 - t)) * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * y3); //actually the z height

		var reg_radius = (Math.pow((width / 2), 2) + Math.pow(y_val, 2)) / (2 * y_val);

		var reg_half_angle = asin((width / 2) / reg_radius);
		var reg_segment_angle = reg_half_angle / stepsPerX / 2;
		var counter = 0;
		for (var j = 0; j <= x_max; j = j + xStepSize) {

			z = Math.round(tan(reg_segment_angle * counter) * (j) * 1000) / 1000;

			transition_points.push([j, x_val, z]);

			if (t == 0) {
				kick_array.push([j, x_val, z]);
			}

			if (t == 1) {
				concave_array.push([j, x_val, z]);
			}

			if (j == x_max) {
				bezier_array.push([j, x_val, z]);
			}

			counter++;


		}


	}

	var triangleArray = [];
	var c = 0;
	var b = 1;
	var i;
	var maxTriangleArray = transition_points.length - stepsPerX - 2;

	for (i = 0; i <= maxTriangleArray; i = i + stepsPerX + 1) {

		for (c = i; c < (i + stepsPerX); c++) {
			triangleArray.push([(c), (c + 1), (stepsPerX + c + 1)]);
			if ((c + 1) <= (i + stepsPerX)) {
				triangleArray.push([(stepsPerX + c + 2), (stepsPerX + c + 1), c + 1]);
			}
		}
	}


	for (let i = 0; i < (transition_points.length); i += (counter)) {
		const chunk = transition_points.slice(i, i + (counter));
		offsetArray.push(chunk);
	}

	console.log(transition_points);


	var mainPoly = polyhedron({ // 
		points: transition_points, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor([0.9, 0.9, 0.9]);

	var shiftedPoly = (polyhedron({ // 
		points: transition_points, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor([0.9, 0.2, 0.2])).translate([0, 0, -offset]);
	/*var result1= polyhedron({ // 
		 points: transition_points, // 
		 triangles: triangleArray // two triangles for square base
		});
		*/


	//our "offsetArray" is now an array of arrays split whenever we iterate the x value.


	var y_max = transition_length;


	var offsetPoints = JSON.parse(JSON.stringify(transition_points)); //offsetPoints will be the array of points we offset, while offsetArray is used for keeping track

	var last_x = -1;
	var last_y = -1;
	var last_z = 0;
	var last_zy = 0;

	var x_offset, y_offset, z_offset;

	var phi; //angle of offset point against x axis
	var beta; //angle of offset point against y axis

	//the difference from the last point to the current point for generating normals
	var delta_x;
	var delta_z;
	var delta_z;

	var current_x, current_y, current_z;
	var j = 0;



	var offsetYePts = []; //offset edge points
	var offsetYcPts = []; //offset center points
	var offsetYtPts = [];
	var offsetTipPts = [];

	var last_y = -1;

	for (let i = 0; i < transition_points.length; i++) { //as we move to each point

		//offset the x value

		j = i - 1;

		current_x = transition_points[i][0]; // get the current x value
		current_y = transition_points[i][1]; //get the current y value
		current_z = transition_points[i][2]; // get the current z value we calculated earlier

		// to find last_z:
		if (current_x == 0) {
			last_z = current_z; //we are at the edge and we want phi to be 0;
			last_x = -1;
		}

		else {
			last_z = transition_points[j][2]; //the previous point's z value
			last_x = transition_points[j][0]; //the previous point's x value
		}


		delta_x = current_x - last_x;
		delta_z = current_z - last_z;

		phi = abs(90 - atan(delta_z / delta_x));

		if (phi == 90) {
			phi = 0; //to prevent infinity/NaN
		}

		//to find the previous y value and z value when x was the same
		if (current_y == 0) {
			last_y = -1;
			last_zy = current_z;

		}

		else if (current_y == y_max) {
			last_y = transition_points[i - counter][1];
			last_zy = current_z;
			/*console.log('current zy and last zy is ' + current_z + '  ' + last_zy);
			console.log('current zx and last zx is ' + current_z + '  ' + last_z);*/
		}

		else {
			last_y = transition_points[i - counter][1];
			last_zy = transition_points[i - counter][2];
		}



		delta_zy = current_z - last_zy;
		delta_y = current_y - last_y; //along y-axis, not along x



		beta = abs(atan(delta_zy / delta_y));

		if (beta == 90) {
			beta = 0; //to prevent infinity/NaN
		}



		/*if (current_y == y_max){
			console.log('phi and beta');
			console.log(phi);
			console.log(beta);
		}*/
		/* --------------*/

		var x_component = 1 / Math.pow(tan(phi), 2);
		var y_component = Math.pow(tan(beta), 2);

		if (!isFinite(x_component)) {
			x_component = 0;
		}

		if (!isFinite(y_component)) {
			y_component = 0;
		}

		z_offset = sqrt(Math.pow(offset, 2) / (x_component + y_component + 1));



		x_offset = z_offset / tan(phi);

		y_offset = z_offset * tan(beta);



		if (!isFinite(x_offset)) {
			x_offset = 0;
		}

		if (!isFinite(y_offset)) {
			y_offset = 0;
		}


		if (z_offset == 0) {
			z_offset = offset;
		}



		offsetPoints[i][0] += x_offset;
		offsetPoints[i][1] += y_offset;
		offsetPoints[i][2] -= z_offset;

		console.log('x and y');
		console.log(current_x + '   ' + current_y);
		console.log('phi and beta');
		console.log(phi + '   ' + beta);
		console.log('offset points:');
		console.log(offsetPoints[i]);

		if (current_x == x_max) { //ye pts
			offsetYePts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_x == 0) { //yc pts
			offsetYcPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_y == 0) { //transition pts
			offsetYtPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_y == y_max) {
			offsetTipPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		last_y = current_y;
	}

	var offsetPointsGroupedRef = JSON.parse(JSON.stringify(offsetPoints));
	var offsetPointsGrouped = [];

	for (let i = 0; i < (offsetPointsGroupedRef.length); i += counter) {
		const chunk = offsetPointsGroupedRef.slice(i, i + counter);
		offsetPointsGrouped.push(chunk);
	}

	console.log(offsetPoints); //findme

	var testPoly = polyhedron({ // 
		points: offsetPoints, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor([0.9, 0.9, 0.9]);

	//  return [color([0.1,0.8,0.95],testPoly),mainPoly, shiftedPoly];


	/* ------------ kick end --------*/

	if (kick_base_drop !== 0) {
		var kick_side_points = offsetYtPts; /*get just the points along 
    	the curve, which will vary with resolution.*/

		var kick_array_length = kick_side_points.length;

		offsetYtPts.push([0, 0, section_depth]);
		offsetYtPts.push([width / 2, 0, section_depth]);

		var kickSideTriangles = [];

		for (var j = 0; j < kick_array_length - 1; j++) {
			kickSideTriangles.push([j + 1, j, kick_array_length]);
		}

		kickSideTriangles.push([kick_array_length - 1, offsetYtPts.length - 2, offsetYtPts.length - 1]);

		for (var k = 0; k < (kickSideTriangles.length); k++) {

			kickSideTriangles[k][0] += offsetPoints.length;
			kickSideTriangles[k][1] += offsetPoints.length;
			kickSideTriangles[k][2] += offsetPoints.length;

		}

		offsetPoints = offsetPoints.concat(offsetYtPts);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	else {

		var kickSidePoints = [
			[0, 0, -offset],
			[width / 2, 0, -offset],
			[0, 0, section_depth],
			[width / 2, 0, section_depth]
		];

		var kickSideTriangles = [
			[2, 1, 0],
			[2, 3, 1]
		];

		for (var k = 0; k < (kickSideTriangles.length); k++) {
			kickSideTriangles[k][0] += offsetPoints.length;
			kickSideTriangles[k][1] += offsetPoints.length;
			kickSideTriangles[k][2] += offsetPoints.length;

		}


		offsetPoints = offsetPoints.concat(kickSidePoints);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	/*var result= polyhedron({ // 
	 points: offsetPoints, // 
	 triangles: triangleArray // two triangles for square base
	}).setColor(0.5,0.9,0.95);
    
    
    
  return result; */


	/* ------------ center of transition section --------*/

	/*	var transitionCenterPoints = [
			[0,0,-offset],
			[0,transition_length,-offset],
			[0,0,section_depth],
			[0,transition_length,section_depth]
		];
		
		var transitionCenterTriangles = [
			[0,1,2],
			[1,3,2]
		];
		 
		 for (var k=0; k<(transitionCenterTriangles.length); k++){
			transitionCenterTriangles[k][0]+=offsetPoints.length;
			transitionCenterTriangles[k][1]+=offsetPoints.length;
			transitionCenterTriangles[k][2]+=offsetPoints.length;
		    
		}
		   
		   
		   offsetPoints = offsetPoints.concat(transitionCenterPoints);
		   
		   triangleArray = triangleArray.concat(transitionCenterTriangles);
		
		   
		/*var result= polyhedron({ // 
			points: offsetPoints, // 
			triangles: triangleArray // two triangles for square base
		   }).setColor(0.5,0.5,0.99);
		   
		   
		   
		   
		 return result;
		 */

	/* ------------ concave end of transition section --------*/

	//points are concave_array points, plus the border points, which are added below:

	var concave_array_curve_points = offsetTipPts; /*get just the points along 
	the curve, which will vary with resolution.*/

	var curve_array_length = concave_array_curve_points.length;

	offsetTipPts.push([0, transition_length, section_depth]);
	offsetTipPts.push([width / 2, transition_length, section_depth]);

	var concaveSideTriangles = [];


	for (var j = 0; j < curve_array_length - 1; j++) {
		concaveSideTriangles.push([j, j + 1, curve_array_length]);
	}

	concaveSideTriangles.push([curve_array_length - 1, offsetTipPts.length - 1, offsetTipPts.length - 2]);



	/* var result=polyhedron({
		points: offsetTipPts,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/

	for (var k = 0; k < (concaveSideTriangles.length); k++) {
		concaveSideTriangles[k][0] += offsetPoints.length;
		concaveSideTriangles[k][1] += offsetPoints.length;
		concaveSideTriangles[k][2] += offsetPoints.length;

	}


	offsetPoints = offsetPoints.concat(offsetTipPts);

	triangleArray = triangleArray.concat(concaveSideTriangles);


	/*var result= polyhedron({ // 
	 points: offsetPoints, // 
	 triangles: triangleArray // two triangles for square base
	}).setColor(0.5,0.95,0.99);
    
	return result;
	*/

	/* ------------ edge of transition section (along bezier) --------*/

	//points are bezier_array points, plus the border points, which are added below:

	var bezier_array_length = offsetYePts.length; /*first, store the value of */

	offsetYePts.push([width / 2, 0, section_depth]);
	offsetYePts.push([width / 2, transition_length, section_depth]);

	var bezierTriangles = [];


	for (var j = 0; j < bezier_array_length - 1; j++) {
		bezierTriangles.push([bezier_array_length, j + 1, j]);
	}

	bezierTriangles.push([offsetYePts.length - 2, offsetYePts.length - 1, bezier_array_length - 1]);


	/* var result=polyhedron({
		points: offsetTipPts,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/


	for (var k = 0; k < (bezierTriangles.length); k++) {

		bezierTriangles[k][0] += offsetPoints.length;
		bezierTriangles[k][1] += offsetPoints.length;
		bezierTriangles[k][2] += offsetPoints.length;

	}


	offsetPoints = offsetPoints.concat(offsetYePts);

	triangleArray = triangleArray.concat(bezierTriangles);


	/* var result= polyhedron({ // 
	  points: offsetPoints, // 
	  triangles: triangleArray // two triangles for square base
	 }).setColor(0.8,0.99,0.99);
			   
	 
   
	 
   return result;*/

	/* ------------ bottom --------*/

	var bottomPoints = [
		[0, 0, section_depth],
		[width / 2, 0, section_depth],
		[0, transition_length, section_depth],
		[width / 2, transition_length, section_depth]
	];

	var bottomTriangles = [
		[2, 1, 0],
		[2, 3, 1]
	];

	for (var k = 0; k < (bottomTriangles.length); k++) {

		bottomTriangles[k][0] += offsetPoints.length;
		bottomTriangles[k][1] += offsetPoints.length;
		bottomTriangles[k][2] += offsetPoints.length;

	}


	offsetPoints = offsetPoints.concat(bottomPoints);

	triangleArray = triangleArray.concat(bottomTriangles);

	for (let i = 0; i < offsetPoints.length; i++) {
		for (let j = 0; j < 3; j++) {
			offsetPoints[i][j] = Math.round(offsetPoints[i][j] * 1000) / 1000;
		}

	}

	var finalArray = JSON.parse(JSON.stringify(offsetPoints));

	for (let i = 0; i < offsetPoints.length; i++) {
		finalArray.push([-offsetPoints[i][0], offsetPoints[i][1], offsetPoints[i][2]]);
	}

	var finalTriangleArray = JSON.parse(JSON.stringify(triangleArray));
	var triangleArrayLength = triangleArray.length;

	for (let i = 0; i < triangleArrayLength; i++) {
		finalTriangleArray.push([triangleArray[i][1] + offsetPoints.length, triangleArray[i][0] + offsetPoints.length, triangleArray[i][2] + offsetPoints.length]);

	}


	var result = polyhedron({ // 
		points: finalArray, // 
		triangles: finalTriangleArray // two triangles for square base
	}).setColor(0.9, 0.9, 0.9);

	//result = result.union(mirror([1,0,0],result));
	result = rotate([180, 0, -90], result);
	result = result.translate([0, 0, -offset]);
	return result; //radial transition section offset






}


function make_tub_transition_section_offset(transition_length, thickness, slice_thickness, width, deck_width, tub_rad, number_of_segments, model_res, kick_base_drop, flat_width, concave_drop, mold_height, tub_res, offset) {
	var section_depth = mold_height - offset;


	var y_max = transition_length;
	var x_max = width / 2;



	var res = 100; //resolution of bezier curves

	var x_res = tub_res;

	/*The following equations were derived on a piece of paper, using tan(tub_angle) = (concave_drop - tub_rad + tub_rad*cos(tub_angle))/(deck_width/2 - flat_width/2 - tub_rad*sin(tub_angle)) and some trig identities: sin^2(x) + cos^2(x) = 1. This website was helpful: https://www.symbolab.com/solver/trigonometric-simplification-calculator
	*/

	var a = Math.pow(concave_drop - tub_rad, 2) + Math.pow((deck_width / 2 - flat_width / 2), 2);

	var b = 2 * tub_rad * (concave_drop - tub_rad);

	var c = Math.pow(tub_rad, 2) - Math.pow(deck_width / 2 - flat_width / 2, 2);

	var tub_angle = acos((-b + sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a));

	var x = x_max;
	var concave_depth;

	if (x < flat_width / 2) {
		concave_depth = 0;
	}

	else {
		if (x <= (tub_rad * sin(tub_angle))) {
			concave_depth = (tub_rad - sqrt((pow(tub_rad, 2) - pow((x), 2))));

		}

		else {
			concave_depth = ((tub_rad - (tub_rad * cos(tub_angle))) + (((x) - tub_rad * sin(tub_angle)) * tan(tub_angle)));
		}
	}

	var stepsPerY = model_res; //how many iterations are done until we move onto next y value
	var stepsPerX = (width / 2) / x_res; //how many iterations done until we move onto next x value

	var xStepSize = x_res;
	//console.log('y res = ' + stepsPerY);

	// B(t) = [(1-t)^3]P0 + 3[(1-t)^2]tP1 + 3[(1-t)t^2]P2 + (t^3)P3
	var i_range = 1; //range for t, which must be 0 <= t <= 1

	//the direction of i is the direction of y

	var i_size = i_range / stepsPerY;

	var origin_x = 0;
	var origin_y = 0;

	var a = 0; //initial t value of Bezier

	var x0 = 0;
	var x1 = transition_length / 4;
	var x2 = transition_length * (2 / 3);
	var x3 = transition_length;

	/*var y0 = kick_base_drop;
	var y1 = kick_base_drop;
	var y2 = concave_depth;
	var y3 = concave_depth;*/

	var z;

	var slice_adj = 0;
	var x_val_last = 0;

	var transition_points = [];



	var kBR = (Math.pow(kick_base_drop, 2) + Math.pow(width / 2, 2)) / (2 * kick_base_drop); //kick base radius

	if (!isFinite(kBR)) {
		kBR = 0;
	}

	var concave_array = []; /*this is the last array of points along the x-axis (width) before the concave section*/

	var kick_array = []; /*this is the first array of points along the x-axis (y=0), needed for kick base drop*/

	var bezier_array = [[width / 2, 0, 0]]; /*array of points along edge of bezier curve*/

	var x_tub = 0;

	var offsetArray = []; //array of points that will be offset
	var counter;

	for (x = 0; x <= width / 2; x += x_res) { //

		counter = 0;

		var y0 = kBR - kBR * cos(asin(x / kBR));
		if (!isFinite(y0)) {
			y0 = 0;
		}
		var y1 = y0;

		var concave_drop_x; //concave drop along x width

		if (x < flat_width / 2) {
			concave_drop_x = 0;
		}

		else {

			if (x_tub <= (tub_rad * sin(tub_angle))) {
				concave_drop_x = (tub_rad - sqrt((pow(tub_rad, 2) - pow((x_tub), 2))));
			}

			else {
				concave_drop_x = ((tub_rad - (tub_rad * cos(tub_angle))) + (((x_tub) - tub_rad * sin(tub_angle)) * tan(tub_angle)));
			}
			x_tub += x_res;
		}

		var y2 = concave_drop_x;
		var y3 = y2;



		for (var i = a; i < (i_range + i_size); i = i + i_size) {
			var t = i;
			var x_val = ((Math.pow((1 - t), 3)) * x0) + (3 * (Math.pow((1 - t), 2)) * t * x1) + (3 * ((1 - t)) * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * x3); //actually the position along y
			var y_val = ((Math.pow((1 - t), 3)) * y0) + (3 * (Math.pow((1 - t), 2)) * t * y1) + (3 * ((1 - t)) * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * y3); //actually the z height

			x_val = Math.round(x_val * 1000) / 1000;
			y_val = Math.round(y_val * 1000) / 1000;
			x = Math.round(x * 100000) / 100000;

			z = y_val;

			transition_points.push([x, x_val, z]);

			if (t == 0) {
				kick_array.push([x, x_val, z]);
			}

			if (t == 1) {
				concave_array.push([x, x_val, z]);
			}

			if (x == x_max) {
				bezier_array.push([x, x_val, z]);
			}



		}
		counter++;
	}

	var triangleArray = [];
	var c = 0;
	var b = 1;
	var i;
	var maxTriangleArray = transition_points.length - stepsPerY - 2;

	for (i = 0; i <= maxTriangleArray; i = i + stepsPerY + 1) {

		for (c = i; c < (i + stepsPerY); c++) {
			triangleArray.push([(c + 1), (c), (stepsPerY + c + 1)]);
			if ((c + 1) <= (i + stepsPerY)) {
				triangleArray.push([(stepsPerY + c + 1), (stepsPerY + c + 2), c + 1]);
			}
		}
	}

	for (let i = 0; i < (transition_points.length); i += (counter)) {
		const chunk = transition_points.slice(i, i + (counter));
		offsetArray.push(chunk);
	}

	var result1 = polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	});

	var ptArray = [];


	console.log('og');
	console.log(transition_points);
	var mainPoly = polyhedron({ // 
		points: transition_points, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor([0.9, 0.9, 0.9]);

	var shiftedPoly = (polyhedron({ // 
		points: transition_points, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor([0.8, 0.2, 0.8])).translate([0, 0, -offset]);

	//our "offsetArray" is now an array of arrays split whenever we iterate the x value.


	var y_max = transition_length;


	var offsetPoints = JSON.parse(JSON.stringify(transition_points)); //offsetPoints will be the array of points we offset, while offsetArray is used for keeping track

	var last_x = -1;
	var last_y = -1;
	var last_z = 0;
	var last_zy = 0;

	var x_offset, y_offset, z_offset;

	var phi; //angle of offset point against x axis
	var beta; //angle of offset point against y axis

	//the difference from the last point to the current point for generating normals
	var delta_x;
	var delta_z;
	var delta_z;

	var current_x, current_y, current_z;
	var j = 0;



	var offsetYePts = []; //offset edge points
	var offsetYcPts = []; //offset center points
	var offsetYtPts = [];
	var offsetTipPts = [];

	var last_y = -1;
	console.log('counter is ' + counter);
	for (let i = 0; i < transition_points.length; i++) { //as we move to each point

		//offset the x value

		j = i - 1;

		current_x = transition_points[i][0]; // get the current x value
		current_y = transition_points[i][1]; //get the current y value
		current_z = transition_points[i][2]; // get the current z value we calculated earlier

		// to find last_z:
		if (current_x == 0) {
			last_z = current_z; //we are at the edge and we want phi to be 0;
			last_x = -1;
		}


		else {
			last_x = transition_points[i - (1 + stepsPerY)][0]
			last_z = transition_points[i - (1 + stepsPerY)][2]
		}


		delta_x = current_x - last_x;
		delta_z = current_z - last_z;

		phi = abs(90 - atan(abs(delta_z / delta_x)));

		if (phi == 90) {
			phi = 0; //to prevent infinity/NaN
		}

		//to find the previous y value and z value when x was the same
		if (current_y == 0) {
			last_y = -1;
			last_zy = current_z;

		}

		else if (current_y == y_max) {
			last_y = transition_points[j][1];
			last_zy = current_z; // 6/8/22


		}

		else {
			//last_y = current_y - y_res;
			last_y = transition_points[j][1];
			last_zy = transition_points[j][2];
		}


		delta_zy = current_z - last_zy;
		delta_y = current_y - last_y; //along y-axis, not along x


		/*console.log('x and y comparison');
		console.log(current_x + '   ' + last_x);
		console.log(current_y + '   ' + last_y);
		console.log('(' + current_x + ',' + current_y + ')');
		console.log(delta_z + '   ' + delta_zy);
	*/


		beta = abs(atan((abs(delta_zy / delta_y))));

		if (beta == 90) {
			beta = 0; //to prevent infinity/NaN
		}


		/* --------------*/

		var x_component = 1 / Math.pow(tan(phi), 2);
		var y_component = Math.pow(tan(beta), 2);

		if (!isFinite(x_component)) {
			x_component = 0;
		}

		if (!isFinite(y_component)) {
			y_component = 0;
		}

		if (delta_zy / delta_z !== abs(delta_zy / delta_z)) {

		}

		z_offset = sqrt(Math.pow(offset, 2) / (x_component + y_component + 1));



		x_offset = z_offset / tan(phi);

		y_offset = z_offset * tan(beta);



		if (!isFinite(x_offset)) {
			x_offset = 0;
		}

		if (!isFinite(y_offset)) {
			y_offset = 0;
		}


		if (z_offset == 0) {
			z_offset = offset;
		}

		/*console.log('phi ' + phi);
		console.log('x_offset: ' + x_offset);
		*/

		offsetPoints[i][0] += x_offset;
		offsetPoints[i][1] += y_offset;
		offsetPoints[i][2] -= z_offset;

		if (current_x == x_max) { //ye pts
			offsetYePts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_x == 0) { //yc pts
			offsetYcPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_y == 0) { //transition pts
			offsetYtPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		if (current_y == y_max) {
			offsetTipPts.push([current_x + x_offset, current_y + y_offset, current_z - z_offset]);
		}

		last_y = current_y;
	}

	var offsetPointsGroupedRef = JSON.parse(JSON.stringify(offsetPoints));
	var offsetPointsGrouped = [];

	for (let i = 0; i < (offsetPointsGroupedRef.length); i += counter) {
		const chunk = offsetPointsGroupedRef.slice(i, i + counter);
		offsetPointsGrouped.push(chunk);
	}


	var testPoly = polyhedron({ // 
		points: offsetPoints, // the apex point
		triangles: triangleArray // two triangles for square base
	}).setColor([0.9, 0.9, 0.9]);

	/* console.log('offsetPoints');
	 
	 console.log(offsetPoints);
	 console.log(transition_points);*/

	//return [testPoly,mainPoly,shiftedPoly];


	/* ------------ kick side --------*/

	if (kick_base_drop !== 0) {
		var kick_side_points = offsetYtPts; /*get just the points along 
    	the curve, which will vary with resolution.*/

		var kick_array_length = kick_side_points.length;

		offsetYtPts.push([0, 0, section_depth]);
		offsetYtPts.push([width / 2, 0, section_depth]);

		var kickSideTriangles = [];

		for (var j = 0; j < kick_array_length - 1; j++) {
			kickSideTriangles.push([j + 1, j, kick_array_length]);
		}

		kickSideTriangles.push([kick_array_length - 1, offsetYtPts.length - 2, offsetYtPts.length - 1]);

		for (var k = 0; k < (kickSideTriangles.length); k++) {

			kickSideTriangles[k][0] += offsetPoints.length;
			kickSideTriangles[k][1] += offsetPoints.length;
			kickSideTriangles[k][2] += offsetPoints.length;

		}

		offsetPoints = offsetPoints.concat(offsetYtPts);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	else {

		var kickSidePoints = [
			[0, 0, -offset],
			[width / 2, 0, -offset],
			[0, 0, section_depth],
			[width / 2, 0, section_depth]
		];

		var kickSideTriangles = [
			[2, 1, 0],
			[2, 3, 1]
		];

		for (var k = 0; k < (kickSideTriangles.length); k++) {
			kickSideTriangles[k][0] += offsetPoints.length;
			kickSideTriangles[k][1] += offsetPoints.length;
			kickSideTriangles[k][2] += offsetPoints.length;

		}


		offsetPoints = offsetPoints.concat(kickSidePoints);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	/*var result= polyhedron({ // 
	 points: offsetPoints, // 
	 triangles: triangleArray // two triangles for square base
	}).setColor([.9,.99,.9]);
    
    
    
  return result; */


	/* ------------ center of transition section --------*/

	/*var transitionCenterPoints = [
		[0,0,-offset],
		[0,transition_length,-offset],
		[0,0,section_depth],
		[0,transition_length,section_depth]
	];
	
	var transitionCenterTriangles = [
		[0,1,2],
		[1,3,2]
	];
	 
	 for (var k=0; k<(transitionCenterTriangles.length); k++){
		transitionCenterTriangles[k][0]+=offsetPoints.length;
		transitionCenterTriangles[k][1]+=offsetPoints.length;
		transitionCenterTriangles[k][2]+=offsetPoints.length;
	    
	}
	   
	   
	   offsetPoints = offsetPoints.concat(transitionCenterPoints);
	   
	   triangleArray = triangleArray.concat(transitionCenterTriangles);
	
	   
	   /*var result= polyhedron({ // 
		points: offsetPoints, // 
		triangles: triangleArray // two triangles for square base
	   }).setColor([.99,.95,.95]);
	   
	   
	   
	   
	 return result;*/


	/* ------------ concave end of transition section --------*/

	//points are concave_array points, plus the border points, which are added below:

	var concave_array_curve_points = offsetTipPts; /*get just the points along 
	the curve, which will vary with resolution.*/

	var curve_array_length = concave_array_curve_points.length;

	offsetTipPts.push([0, transition_length, section_depth]);
	offsetTipPts.push([width / 2, transition_length, section_depth]);

	var concaveSideTriangles = [];


	for (var j = 0; j < curve_array_length - 1; j++) {
		concaveSideTriangles.push([j, j + 1, curve_array_length]);
	}

	concaveSideTriangles.push([curve_array_length - 1, offsetTipPts.length - 1, offsetTipPts.length - 2]);



	/* var result=polyhedron({
		points: offsetTipPts,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/

	for (var k = 0; k < (concaveSideTriangles.length); k++) {
		concaveSideTriangles[k][0] += offsetPoints.length;
		concaveSideTriangles[k][1] += offsetPoints.length;
		concaveSideTriangles[k][2] += offsetPoints.length;

	}


	offsetPoints = offsetPoints.concat(offsetTipPts);

	triangleArray = triangleArray.concat(concaveSideTriangles);


	/*var result= polyhedron({ // 
	 points: offsetPoints, // 
	 triangles: triangleArray // two triangles for square base
	}).setColor([0.9,0.95,0.99]);
    
	return result;*/


	/* ------------ edge of transition section (along bezier) --------*/

	//points are bezier_array points, plus the border points, which are added below:

	var bezier_array_length = offsetYePts.length; /*first, store the value of */

	offsetYePts.push([width / 2, 0, section_depth]);
	offsetYePts.push([width / 2, transition_length, section_depth]);

	var bezierTriangles = [];


	for (var j = 0; j < bezier_array_length - 1; j++) {
		bezierTriangles.push([bezier_array_length, j + 1, j]);
	}

	bezierTriangles.push([offsetYePts.length - 2, offsetYePts.length - 1, bezier_array_length - 1]);


	/* var result=polyhedron({
		points: concave_array,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/


	for (var k = 0; k < (bezierTriangles.length); k++) {

		bezierTriangles[k][0] += offsetPoints.length;
		bezierTriangles[k][1] += offsetPoints.length;
		bezierTriangles[k][2] += offsetPoints.length;

	}


	offsetPoints = offsetPoints.concat(offsetYePts);

	triangleArray = triangleArray.concat(bezierTriangles);


	/*var result= polyhedron({ // 
	 points: offsetPoints, // 
	 triangles: triangleArray // two triangles for square base
	}).setColor([0.8,0.99,0.95]);
			  
    
  
    
  return result;*/

	/* ------------ bottom --------*/

	var bottomPoints = [
		[0, 0, section_depth],
		[width / 2, 0, section_depth],
		[0, transition_length, section_depth],
		[width / 2, transition_length, section_depth]
	];

	var bottomTriangles = [
		[2, 1, 0],
		[2, 3, 1]
	];

	for (var k = 0; k < (bottomTriangles.length); k++) {

		bottomTriangles[k][0] += offsetPoints.length;
		bottomTriangles[k][1] += offsetPoints.length;
		bottomTriangles[k][2] += offsetPoints.length;

	}


	offsetPoints = offsetPoints.concat(bottomPoints);

	triangleArray = triangleArray.concat(bottomTriangles);

	for (let i = 0; i < offsetPoints.length; i++) {
		for (let j = 0; j < 3; j++) {
			offsetPoints[i][j] = Math.round(offsetPoints[i][j] * 1000) / 1000;
		}

	}

	var finalArray = JSON.parse(JSON.stringify(offsetPoints));

	for (let i = 0; i < offsetPoints.length; i++) {
		finalArray.push([-offsetPoints[i][0], offsetPoints[i][1], offsetPoints[i][2]]);
	}

	var finalTriangleArray = JSON.parse(JSON.stringify(triangleArray));
	var triangleArrayLength = triangleArray.length;

	for (let i = 0; i < triangleArrayLength; i++) {
		finalTriangleArray.push([triangleArray[i][1] + offsetPoints.length, triangleArray[i][0] + offsetPoints.length, triangleArray[i][2] + offsetPoints.length]);

	}


	var result = polyhedron({ // 
		points: finalArray, // 
		triangles: finalTriangleArray // two triangles for square base
	}).setColor(0.9, 0.9, 0.9);

	//result = result.union(mirror([1,0,0],result));
	result = rotate([180, 0, -90], result);
	result = result.translate([0, 0, -offset]);
	return result; //tub transition section offset






}


function make_tub_transition_section(transition_length, thickness, slice_thickness, width, deck_width, tub_rad, number_of_segments, model_res, kick_base_drop, flat_width, concave_drop, mold_height, tub_res) {
	var section_depth = mold_height;

	var y_max = transition_length;
	var x_max = width / 2;



	var res = 100; //resolution of bezier curves

	var x_res = tub_res;

	/*The following equations were derived on a piece of paper, using tan(tub_angle) = (concave_drop - tub_rad + tub_rad*cos(tub_angle))/(deck_width/2 - flat_width/2 - tub_rad*sin(tub_angle)) and some trig identities: sin^2(x) + cos^2(x) = 1. This website was helpful: https://www.symbolab.com/solver/trigonometric-simplification-calculator
	*/

	var a = Math.pow(concave_drop - tub_rad, 2) + Math.pow((deck_width / 2 - flat_width / 2), 2);

	var b = 2 * tub_rad * (concave_drop - tub_rad);

	var c = Math.pow(tub_rad, 2) - Math.pow(deck_width / 2 - flat_width / 2, 2);

	var tub_angle = acos((-b + sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a));

	var x = x_max;
	var concave_depth;

	if (x < flat_width / 2) {
		concave_depth = 0;
	}

	else {
		if (x <= (tub_rad * sin(tub_angle))) {
			concave_depth = (tub_rad - sqrt((pow(tub_rad, 2) - pow((x), 2))));

		}

		else {
			concave_depth = ((tub_rad - (tub_rad * cos(tub_angle))) + (((x) - tub_rad * sin(tub_angle)) * tan(tub_angle)));
		}
	}

	var stepsPerY = model_res; //how many iterations are done until we move onto next y value
	var stepsPerX = (width / 2) / x_res; //how many iterations done until we move onto next x value

	var xStepSize = x_res;

	// B(t) = [(1-t)^3]P0 + 3[(1-t)^2]tP1 + 3[(1-t)t^2]P2 + (t^3)P3
	var i_range = 1; //range for t, which must be 0 <= t <= 1

	//the direction of i is the direction of y

	var i_size = i_range / stepsPerY;

	var origin_x = 0;
	var origin_y = 0;

	var a = 0; //initial t value of Bezier

	var x0 = 0;
	var x1 = transition_length / 4;
	var x2 = transition_length * (2 / 3);
	var x3 = transition_length;

	/*var y0 = kick_base_drop;
	var y1 = kick_base_drop;
	var y2 = concave_depth;
	var y3 = concave_depth;*/

	var z;

	var slice_adj = 0;
	var x_val_last = 0;

	var transition_points = [];



	var kBR = (Math.pow(kick_base_drop, 2) + Math.pow(width / 2, 2)) / (2 * kick_base_drop); //kick base radius

	if (!isFinite(kBR)) {
		kBR = 0;
	}

	var concave_array = []; /*this is the last array of points along the x-axis (width) before the concave section*/

	var kick_array = []; /*this is the first array of points along the x-axis (y=0), needed for kick base drop*/

	var bezier_array = [[width / 2, 0, 0]]; /*array of points along edge of bezier curve*/

	var x_tub = 0;

	for (x = 0; x <= width / 2; x += x_res) { //


		var y0 = kBR - kBR * cos(asin(x / kBR));
		if (!isFinite(y0)) {
			y0 = 0;
		}
		var y1 = y0;

		var concave_drop_x; //concave drop along x width

		if (x < flat_width / 2) {
			concave_drop_x = 0;
		}

		else {

			if (x_tub <= (tub_rad * sin(tub_angle))) {
				concave_drop_x = (tub_rad - sqrt((pow(tub_rad, 2) - pow((x_tub), 2))));
			}

			else {
				concave_drop_x = ((tub_rad - (tub_rad * cos(tub_angle))) + (((x_tub) - tub_rad * sin(tub_angle)) * tan(tub_angle)));
			}
			x_tub += x_res;
		}

		var y2 = concave_drop_x;
		var y3 = y2;




		for (var i = a; i < (i_range + i_size); i = i + i_size) {
			var t = i;
			var x_val = ((Math.pow((1 - t), 3)) * x0) + (3 * (Math.pow((1 - t), 2)) * t * x1) + (3 * ((1 - t)) * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * x3); //actually the position along y
			var y_val = ((Math.pow((1 - t), 3)) * y0) + (3 * (Math.pow((1 - t), 2)) * t * y1) + (3 * ((1 - t)) * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * y3); //actually the z height

			x_val = Math.round(x_val * 1000) / 1000;
			y_val = Math.round(y_val * 1000) / 1000;
			x = Math.round(x * 100000) / 100000;

			z = y_val;

			transition_points.push([x, x_val, z]);

			if (t == 0) {
				kick_array.push([x, x_val, z]);
			}

			if (t == 1) {
				concave_array.push([x, x_val, z]);
			}

			if (x == x_max) {
				bezier_array.push([x, x_val, z]);
			}



		}

	}

	var triangleArray = [];
	var c = 0;
	var b = 1;
	var i;
	var maxTriangleArray = transition_points.length - stepsPerY - 2;

	for (i = 0; i <= maxTriangleArray; i = i + stepsPerY + 1) {

		for (c = i; c < (i + stepsPerY); c++) {
			triangleArray.push([(c + 1), (c), (stepsPerY + c + 1)]);
			if ((c + 1) <= (i + stepsPerY)) {
				triangleArray.push([(stepsPerY + c + 1), (stepsPerY + c + 2), c + 1]);
			}
		}
	}



	var result1 = polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	});

	var ptArray = [];

	/*for (var i=0; i<transition_points.length; i++) {
		ptArray.push(cube({size: [0.05, 0.05, 0.05], center: true}).translate([(transition_points[i][0]),(transition_points[i][1]),(transition_points[i][2])]));
	}
	
	return ptArray;*/

	//return result1;


	/* ------------ kick side --------*/

	if (kick_base_drop !== 0) {
		var kick_side_points = kick_array; /*get just the points along 
    	the curve, which will vary with resolution.*/

		var kick_array_length = kick_side_points.length;

		kick_array.push([0, 0, section_depth]);
		kick_array.push([width / 2, 0, section_depth]);

		var kickSideTriangles = [];

		for (var j = 0; j < kick_array_length - 1; j++) {
			kickSideTriangles.push([j + 1, j, kick_array_length]);
		}

		kickSideTriangles.push([kick_array_length - 1, kick_array.length - 2, kick_array.length - 1]);

		for (var k = 0; k < (kickSideTriangles.length); k++) {

			kickSideTriangles[k][0] += transition_points.length;
			kickSideTriangles[k][1] += transition_points.length;
			kickSideTriangles[k][2] += transition_points.length;

		}

		transition_points = transition_points.concat(kick_array);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	else {

		var kickSidePoints = [
			[0, 0, 0],
			[width / 2, 0, 0],
			[0, 0, section_depth],
			[width / 2, 0, section_depth]
		];

		var kickSideTriangles = [
			[2, 1, 0],
			[2, 3, 1]
		];

		for (var k = 0; k < (kickSideTriangles.length); k++) {
			kickSideTriangles[k][0] += transition_points.length;
			kickSideTriangles[k][1] += transition_points.length;
			kickSideTriangles[k][2] += transition_points.length;

		}


		transition_points = transition_points.concat(kickSidePoints);

		triangleArray = triangleArray.concat(kickSideTriangles);
	}

	var result = polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	}).setColor([.9, .9, .9]);



	//return result;


	/* ------------ center of transition section --------*/

	/*var transitionCenterPoints = [
		[0,0,0],
		[0,transition_length,0],
		[0,0,section_depth],
		[0,transition_length,section_depth]
	];
	
	var transitionCenterTriangles = [
		[0,1,2],
		[1,3,2]
	];
	 
	 for (var k=0; k<(transitionCenterTriangles.length); k++){
		transitionCenterTriangles[k][0]+=transition_points.length;
		transitionCenterTriangles[k][1]+=transition_points.length;
		transitionCenterTriangles[k][2]+=transition_points.length;
	    
	}
	   
	   
	   transition_points = transition_points.concat(transitionCenterPoints);
	   
	   triangleArray = triangleArray.concat(transitionCenterTriangles);
	
	   
	   var result= polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	   }).setColor([.95,.95,.95]);
	   
	   
	   
	   
	 //return result;
	 

/* ------------ concave end of transition section --------*/

	//points are concave_array points, plus the border points, which are added below:

	var concave_array_curve_points = concave_array; /*get just the points along 
	the curve, which will vary with resolution.*/

	var curve_array_length = concave_array_curve_points.length;

	concave_array.push([0, transition_length, section_depth]);
	concave_array.push([width / 2, transition_length, section_depth]);

	var concaveSideTriangles = [];


	for (var j = 0; j < curve_array_length - 1; j++) {
		concaveSideTriangles.push([j, j + 1, curve_array_length]);
	}

	concaveSideTriangles.push([curve_array_length - 1, concave_array.length - 1, concave_array.length - 2]);



	/* var result=polyhedron({
		points: concave_array,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/

	for (var k = 0; k < (concaveSideTriangles.length); k++) {
		concaveSideTriangles[k][0] += transition_points.length;
		concaveSideTriangles[k][1] += transition_points.length;
		concaveSideTriangles[k][2] += transition_points.length;

	}


	transition_points = transition_points.concat(concave_array);

	triangleArray = triangleArray.concat(concaveSideTriangles);


	var result = polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	}).setColor([0.95, 0.95, 0.95]);

	//return result;


	/* ------------ edge of transition section (along bezier) --------*/

	//points are bezier_array points, plus the border points, which are added below:

	var bezier_array_length = bezier_array.length; /*first, store the value of */

	bezier_array.push([width / 2, 0, section_depth]);
	bezier_array.push([width / 2, transition_length, section_depth]);

	var bezierTriangles = [];


	for (var j = 0; j < bezier_array_length - 1; j++) {
		bezierTriangles.push([bezier_array_length, j + 1, j]);
	}

	bezierTriangles.push([bezier_array.length - 2, bezier_array.length - 1, bezier_array_length - 1]);


	/* var result=polyhedron({
		points: concave_array,
		triangles: concaveSideTriangles
	 });
	 
	 return result;*/


	for (var k = 0; k < (bezierTriangles.length); k++) {

		bezierTriangles[k][0] += transition_points.length;
		bezierTriangles[k][1] += transition_points.length;
		bezierTriangles[k][2] += transition_points.length;

	}


	transition_points = transition_points.concat(bezier_array);

	triangleArray = triangleArray.concat(bezierTriangles);


	var result = polyhedron({ // 
		points: transition_points, // 
		triangles: triangleArray // two triangles for square base
	}).setColor([0.95, 0.95, 0.95]);




	// return result;

	/* ------------ bottom --------*/

	var bottomPoints = [
		[0, 0, section_depth],
		[width / 2, 0, section_depth],
		[0, transition_length, section_depth],
		[width / 2, transition_length, section_depth]
	];

	var bottomTriangles = [
		[2, 1, 0],
		[2, 3, 1]
	];

	for (var k = 0; k < (bottomTriangles.length); k++) {

		bottomTriangles[k][0] += transition_points.length;
		bottomTriangles[k][1] += transition_points.length;
		bottomTriangles[k][2] += transition_points.length;

	}


	transition_points = transition_points.concat(bottomPoints);

	triangleArray = triangleArray.concat(bottomTriangles);

	for (let i = 0; i < transition_points.length; i++) {
		for (let j = 0; j < 3; j++) {
			transition_points[i][j] = Math.round(transition_points[i][j] * 1000) / 1000;
		}
	}

	var finalArray = JSON.parse(JSON.stringify(transition_points));

	for (let i = 0; i < transition_points.length; i++) {
		finalArray.push([-transition_points[i][0], transition_points[i][1], transition_points[i][2]]);
	}

	var finalTriangleArray = JSON.parse(JSON.stringify(triangleArray));
	var triangleArrayLength = triangleArray.length;

	for (let i = 0; i < triangleArrayLength; i++) {
		finalTriangleArray.push([triangleArray[i][1] + transition_points.length, triangleArray[i][0] + transition_points.length, triangleArray[i][2] + transition_points.length]);

	}

	var result = polyhedron({ // 
		points: finalArray, // 
		triangles: finalTriangleArray // two triangles for square base
	}).setColor(0.9, 0.9, 0.9);

	// result = result.union(mirror([1,0,0],result));
	result = rotate([180, 0, -90], result);
	result = result.translate([0, 0, 0]);
	return result; //tub transition section (not offset)






}




function make_profile(width, wheelbase, boltL, nose_length, tail_length, length, taperN, taperT, nose_shape, tail_shape, depth) {
	var profile = new CSG.Path2D([[0, (width / 2)], [(((wheelbase / 2) + boltL + nose_length) - taperN), (width / 2)]]);

	profile = profile.appendBezier([[((((wheelbase / 2) + boltL + nose_length) - taperN) + (nose_shape * (taperN))), (width / 2)], [((wheelbase / 2) + boltL + nose_length), (nose_shape * (width / 2))], [((wheelbase / 2) + boltL + nose_length), 0]], { resolution: 100 });

	profile = profile.appendBezier([[((wheelbase / 2) + boltL + nose_length), (-(nose_shape * (width / 2)))], [((((wheelbase / 2) + boltL + nose_length) - taperN) + (nose_shape * (taperN))), (-(width / 2))], [(((wheelbase / 2) + boltL + nose_length) - taperN), (-(width / 2))]], { resolution: 100 });

	profile = profile.appendPoint([0, (-(width / 2))]);

	profile = profile.appendPoint([-(((wheelbase / 2) + boltL + tail_length) - taperT), -(width / 2)]);

	profile = profile.appendBezier([[-((((wheelbase / 2) + boltL + tail_length) - taperT) + (tail_shape * (taperT))), -(width / 2)], [-((wheelbase / 2) + boltL + tail_length), -(tail_shape * (width / 2))], [-((wheelbase / 2) + boltL + tail_length), 0]], { resolution: 100 });

	profile = profile.appendBezier([[-((wheelbase / 2) + boltL + tail_length), ((tail_shape * (width / 2)))], [-((((wheelbase / 2) + boltL + tail_length) - taperT) + (tail_shape * (taperT))), ((width / 2))], [-(((wheelbase / 2) + boltL + tail_length) - taperT), ((width / 2))]], { resolution: 100 });

	profile = profile.appendPoint([0, (width / 2)]);

	profile = profile.close();

	var skateboard = profile.innerToCAG();

	skateboard = linear_extrude({ height: depth }, skateboard);


	return skateboard;

}

function make_lb_profile(width, wheelbase, boltL, nose_length, tail_length, length, taperN, taperT, depth, noseLipX, noseLipY, noseY, tailLipX, tailLipY, tailY) {
	var res = 250; //resolution of bezier curves

	var profile = new CSG.Path2D([[0, (width / 2)], [(((wheelbase / 2) + boltL + nose_length) - taperN), (width / 2)]]);

	profile = profile.appendBezier([[(noseLipX), (width / 2)], [(noseLipX), (noseLipY)], [((wheelbase / 2) + boltL + nose_length), (noseY)], [((wheelbase / 2) + boltL + nose_length), 0]], { resolution: res });

	profile = profile.appendBezier([[((wheelbase / 2) + boltL + nose_length), (-noseY)], [noseLipX, (-noseLipY)], [noseLipX, (-(width / 2))], [(((wheelbase / 2) + boltL + nose_length) - taperN), -(width / 2)]], { resolution: res });

	profile = profile.appendPoint([0, (-(width / 2))]);

	profile = profile.appendPoint([-(((wheelbase / 2) + boltL + tail_length) - taperT), -(width / 2)]);


	profile = profile.appendBezier([[(-tailLipX), -(width / 2)], [(-tailLipX), (-tailLipY)], [-(((wheelbase / 2) + boltL + tail_length)), -(tailY)], [-(((wheelbase / 2) + boltL + tail_length)), 0]], { resolution: res });

	profile = profile.appendBezier([[-(((wheelbase / 2) + boltL + tail_length)), (tailY)], [-tailLipX, (tailLipY)], [-tailLipX, ((width / 2))], [-((((wheelbase / 2) + boltL + tail_length)) - taperT), (width / 2)]], { resolution: res });


	profile = profile.appendPoint([0, (width / 2)]);

	profile = profile.close();

	var skateboard = profile.innerToCAG();

	skateboard = linear_extrude({ height: depth }, skateboard);


	return skateboard;

}

function make_section_bores(mold_width, mold_length, print_length, print_width, bore_dia, bore_depth, mold_height, printSection, spacing, nose_length, tail_length, display, extra_depth) {
	var result = new CSG();
	var cyl_depth = bore_depth + extra_depth;
	var maxNumberSections = 7; //at most we have 7 sections with extended nose/tail
	var minNumberSections = 5; //at minimum we have 5 sections

	var width_location;

	if (print_width >= mold_width) {
		width_location = -(mold_width / 2 - spacing);
	}

	else {
		width_location = spacing;
	}

	result = cylinder({ r: bore_dia / 2, h: cyl_depth, center: true }).translate([0, 0, -mold_height + (cyl_depth / 2) - extra_depth]);

	var cyl1 = result;
	var cyl2 = result;
	var cyl3 = result;
	var cyl4 = result;



	cyl1 = cyl1.translate([(nose_length - tail_length) / 2 + (print_length / 2) - spacing, width_location, 0]);
	cyl2 = cyl2.translate([(nose_length - tail_length) / 2 + (print_length / 2) - spacing, mold_width / 2 - spacing, 0]);
	cyl3 = cyl3.translate([(nose_length - tail_length) / 2 - ((print_length / 2) - spacing), mold_width / 2 - spacing, 0]);
	cyl4 = cyl4.translate([(nose_length - tail_length) / 2 - ((print_length / 2) - spacing), width_location, 0]);

	var cyl5 = result;
	var cyl6 = result;
	var cyl7 = result;
	var cyl8 = result;

	cyl5 = cyl5.translate([print_length + (nose_length - tail_length) / 2 + (print_length / 2) - spacing, width_location, 0]);
	cyl6 = cyl6.translate([print_length + (nose_length - tail_length) / 2 + (print_length / 2) - spacing, mold_width / 2 - spacing, 0]);
	cyl7 = cyl7.translate([print_length + (nose_length - tail_length) / 2 - ((print_length / 2) - spacing), mold_width / 2 - spacing, 0]);
	cyl8 = cyl8.translate([print_length + (nose_length - tail_length) / 2 - ((print_length / 2) - spacing), width_location, 0]);

	var cyl17 = result;
	var cyl18 = result;
	var cyl19 = result;
	var cyl20 = result;

	cyl17 = cyl17.translate([(nose_length - tail_length) / 2 - (print_length + (print_length / 2) - spacing), width_location, 0]);
	cyl18 = cyl18.translate([(nose_length - tail_length) / 2 - (print_length + (print_length / 2) - spacing), mold_width / 2 - spacing, 0]);
	cyl19 = cyl19.translate([(nose_length - tail_length) / 2 - (print_length - ((print_length / 2) - spacing)), mold_width / 2 - spacing, 0]);
	cyl20 = cyl20.translate([(nose_length - tail_length) / 2 - (print_length - ((print_length / 2) - spacing)), width_location, 0]);



	var cyl9 = result;
	var cyl10 = result;
	var cyl11 = result;
	var cyl12 = result;

	var cyl21 = result;
	var cyl22 = result;
	var cyl23 = result;
	var cyl24 = result;

	if ((mold_length <= (5 * print_length))) {
		cyl9 = cyl9.translate([(nose_length - tail_length) / 2 + (mold_length / 2) - spacing, width_location, 0]);
		cyl10 = cyl10.translate([(nose_length - tail_length) / 2 + (mold_length / 2) - spacing, mold_width / 2 - spacing, 0]);
		cyl21 = cyl21.translate([(nose_length - tail_length) / 2 - ((mold_length / 2) - spacing), width_location, 0]);
		cyl22 = cyl22.translate([(nose_length - tail_length) / 2 - ((mold_length / 2) - spacing), mold_width / 2 - spacing, 0]);
	}
	else {
		cyl9 = cyl9.translate([2 * print_length + (nose_length - tail_length) / 2 + ((print_length / 2) - spacing), width_location, 0]);
		cyl10 = cyl10.translate([2 * print_length + (nose_length - tail_length) / 2 + ((print_length / 2) - spacing), mold_width / 2 - spacing, 0]);
		cyl21 = cyl21.translate([(nose_length - tail_length) / 2 - (2 * print_length + ((print_length / 2) - spacing)), width_location, 0]);
		cyl22 = cyl22.translate([(nose_length - tail_length) / 2 - (2 * print_length + ((print_length / 2) - spacing)), mold_width / 2 - spacing, 0]);
	}
	cyl11 = cyl11.translate([2 * print_length + (nose_length - tail_length) / 2 - ((print_length / 2) - spacing), mold_width / 2 - spacing, 0]);
	cyl12 = cyl12.translate([2 * print_length + (nose_length - tail_length) / 2 - ((print_length / 2) - spacing), width_location, 0]);
	cyl23 = cyl23.translate([(nose_length - tail_length) / 2 - (2 * print_length - ((print_length / 2) - spacing)), mold_width / 2 - spacing, 0]);
	cyl24 = cyl24.translate([(nose_length - tail_length) / 2 - (2 * print_length - ((print_length / 2) - spacing)), width_location, 0]);


	var plane = CSG.Plane.fromPoints([(nose_length - tail_length) / 2, 0, 0], [(nose_length - tail_length) / 2, 5, 1], [(nose_length - tail_length) / 2, 1, 2]);

	var bore_array = [cyl1, cyl2, cyl3, cyl4, cyl5, cyl6, cyl7, cyl8, cyl9, cyl10, cyl11, cyl12, cyl17, cyl18, cyl19, cyl20, cyl21, cyl22, cyl23, cyl24];

	if ((mold_length > (5 * print_length)) || (mold_length < (7 * print_length))) {
		var cyl13 = result;
		var cyl14 = result;
		var cyl15 = result;
		var cyl16 = result;

		cyl13 = cyl13.translate([(nose_length - tail_length) / 2 + (mold_length / 2) - spacing, width_location, 0]);
		cyl14 = cyl14.translate([(nose_length - tail_length) / 2 + (mold_length / 2) - spacing, mold_width / 2 - spacing, 0]);
		cyl15 = cyl15.translate([3 * print_length + (nose_length - tail_length) / 2 - ((print_length / 2) - spacing), mold_width / 2 - spacing, 0]);
		cyl16 = cyl16.translate([3 * print_length + (nose_length - tail_length) / 2 - ((print_length / 2) - spacing), width_location, 0]);

		var cyl25 = result;
		var cyl26 = result;
		var cyl27 = result;
		var cyl28 = result;

		cyl25 = cyl25.translate([(nose_length - tail_length) / 2 - ((mold_length / 2) - spacing), width_location, 0]);
		cyl26 = cyl26.translate([(nose_length - tail_length) / 2 - ((mold_length / 2) - spacing), mold_width / 2 - spacing, 0]);
		cyl27 = cyl27.translate([(nose_length - tail_length) / 2 - (3 * print_length - ((print_length / 2) - spacing)), mold_width / 2 - spacing, 0]);
		cyl28 = cyl28.translate([(nose_length - tail_length) / 2 - (3 * print_length - ((print_length / 2) - spacing)), width_location, 0]);


		var extended_bores = [cyl13, cyl14, cyl15, cyl16, cyl25, cyl26, cyl27, cyl28];
		var ext_bore_array_length = extended_bores.length;

		for (var j = 0; j < ext_bore_array_length; j++) {
			bore_array.push(extended_bores[j]);
		}
	}

	var bore_array_length = bore_array.length;


	/*console.log('bore array length = ' + bore_array.length);
	for (var i=0; i<bore_array_length; i++) {
		bore_array.push((bore_array[i]).mirrored(plane)); //need to fix this - mirrored holes get shifted in z direction
	    
	}*/

	/*for (var k=0;k<bore_array_length;k++) {
		bore_array[k]=bore_array[k].translate([0,0,bore_depth/2]);
	}
	*/

	return bore_array;



}